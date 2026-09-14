import json,math,collections
from pathlib import Path
from shapely.geometry import LineString, Polygon, Point, box
from shapely.ops import unary_union,polygonize,linemerge
from shapely.strtree import STRtree
from shapely import make_valid

ROOT=Path(r'C:\Users\jason\Documents\Dev\372geomedia-map-assets')
raw=json.loads((ROOT/'galveston-osm-raw.json').read_text())
west,south,east,north=-95.02,29.24,-94.70,29.45
W=1200
def merc(lat): return math.log(math.tan(math.pi/4+math.radians(lat)/2))
x0=math.radians(west); y0=merc(south); x1=math.radians(east); y1=merc(north)
S=W/(x1-x0); H=(y1-y0)*S
# North-up Cartesian during topology. SVG y inversion only when serialized.
def project(lon,lat): return ((math.radians(lon)-x0)*S,(merc(lat)-y0)*S)
def screen(lon,lat):
 x,y=project(lon,lat)
 return [round(x,2),round(H-y,2)]
frame=box(0,0,W,H)
layers={k:[] for k in ['coastline','wetlands','water','waterways','industrial','roadsMajor','roadsMinor','buildings']}
counts=collections.Counter()
for el in raw['elements']:
 coords=[project(p['lon'],p['lat']) for p in el.get('geometry',[]) if 'lon' in p]
 if len(coords)<2: continue
 t=el.get('tags',{})
 if t.get('natural')=='coastline': key='coastline'
 elif t.get('natural')=='wetland': key='wetlands'
 elif t.get('natural')=='water': key='water'
 elif t.get('landuse') in ['industrial','port','salt_pond']: key='industrial'
 elif 'highway' in t: key='roadsMinor' if t['highway'] in ['secondary','tertiary'] else 'roadsMajor'
 elif 'building' in t: key='buildings'
 else: key='waterways'
 ispolygon=key in ['wetlands','water','industrial','buildings']
 if ispolygon:
  if len(coords)<4 or coords[0]!=coords[-1]: continue # never invent closure for incomplete multipolygon members
  geo=make_valid(Polygon(coords))
 else: geo=LineString(coords)
 if not geo.intersects(frame): continue
 geo=geo.intersection(frame)
 if geo.is_empty: continue
 if key=='buildings' and geo.area<0.9: continue # >=~500 square meter footprints at this map scale
 layers[key].append(geo); counts[key]+=1

# Build shore fills from exact coastline plus clipping rectangle.
coast=unary_union(layers['coastline'])
faces=list(polygonize(unary_union([coast,frame.boundary])))
tree=STRtree(faces)
votes=[collections.Counter() for f in faces]
for line in layers['coastline']:
 lines=[line] if line.geom_type=='LineString' else list(line.geoms)
 for ln in lines:
  if ln.geom_type!='LineString': continue
  for (ax,ay),(bx,by) in zip(ln.coords,list(ln.coords)[1:]):
   dx,dy=bx-ax,by-ay; length=math.hypot(dx,dy)
   if length<0.00001: continue
   mx,my=(ax+bx)/2,(ay+by)/2
   for side,sign in [('land',1),('ocean',-1)]:
    p=Point(mx-sign*dy/length*0.002,my+sign*dx/length*0.002)
    for idx in tree.query(p,predicate='within'): votes[int(idx)][side]+=length
landfaces=[f for f,v in zip(faces,votes) if v['land']>v['ocean']]
layers['land']=landfaces
counts['land']=len(landfaces)
print('Faces:',len(faces),'land:',len(landfaces),'unclassified:',sum(not v for v in votes))
print('Counts:',dict(counts))
land=unary_union(landfaces)
for name,lon,lat in [('Galveston',-94.7977,29.3013),('Texas City',-94.9027,29.3838),('Bay water',-94.83,29.40),('Gulf water',-94.77,29.26)]:
 print(name,'land=',land.contains(Point(project(lon,lat))))

def fmt(x): return f'{x:.1f}'.rstrip('0').rstrip('.')
def coords_path(coords,close=False):
 pts=list(coords)
 if close and pts[0]==pts[-1]: pts=pts[:-1]
 if len(pts)<2: return ''
 return 'M'+'L'.join(fmt(x)+','+fmt(H-y) for x,y in pts)+('Z' if close else '')
def path(g):
 if g.is_empty:return ''
 if g.geom_type=='Polygon':return coords_path(g.exterior.coords,True)+''.join(coords_path(r.coords,True) for r in g.interiors)
 if g.geom_type in ['LineString','LinearRing']:return coords_path(g.coords)
 if hasattr(g,'geoms'):return ''.join(path(x) for x in g.geoms)
 return ''
tols={'land':.85,'coastline':.85,'wetlands':.7,'water':.75,'waterways':.7,'industrial':.35,'roadsMajor':.5,'roadsMinor':.6,'buildings':.15}
resultlayers={}
for k,gs in layers.items():
 if k=='buildings': gs=sorted(gs,key=lambda g:g.area,reverse=True)[:340]
 if not gs:continue
 merged=unary_union(gs)
 if k in ['roadsMajor','roadsMinor','waterways','coastline'] and merged.geom_type=='MultiLineString':merged=linemerge(merged)
 simplified=merged.simplify(tols[k],preserve_topology=True)
 resultlayers[k]={'path':path(simplified),'featureCount':len(gs)}
 print(k,len(resultlayers[k]['path']))

result={'viewBox':[0,0,W,round(H,2)],'extent':{'west':west,'south':south,'east':east,'north':north},'projection':'Web Mercator (EPSG:3857), normalized to viewBox, north up',
 'source':{'name':'OpenStreetMap contributors','endpoint':'https://overpass-api.de/api/interpreter','sourceTimestamp':raw['osm3s']['timestamp_osm_base'],'attribution':'© OpenStreetMap contributors','attributionUrl':'https://www.openstreetmap.org/copyright','license':'ODbL 1.0','licenseUrl':'https://opendatacommons.org/licenses/odbl/1-0/','processing':'Clipped to extent, coastline land polygons assembled using OSM land-left direction, simplified in normalized display coordinates. Closed wetland/water/industrial ways only; larger building footprints selected for legibility. No observation data included.'},
 'labels':[{'name':name,'position':screen(lon,lat),'coordinates':[lon,lat]} for name,lon,lat in [('GALVESTON',-94.7977,29.3013),('TEXAS CITY',-94.9027,29.3838),('GALVESTON BAY',-94.821,29.411),('WEST BAY',-94.944,29.280),('GULF OF MEXICO',-94.775,29.265),('PELICAN ISLAND',-94.808,29.338)]],
 'illustrativeObservationAnchors':[{'id':'GB-01','position':screen(-94.863,29.399),'coordinates':[-94.863,29.399],'note':'Illustrative location only; no measured observation is represented.'},{'id':'GB-02','position':screen(-94.83,29.356),'coordinates':[-94.83,29.356],'note':'Illustrative location only; no measured observation is represented.'},{'id':'GB-03','position':screen(-94.93,29.31),'coordinates':[-94.93,29.31],'note':'Illustrative location only; no measured observation is represented.'}],
 'layers':resultlayers}
(ROOT/'galveston-map.json').write_text(json.dumps(result,separators=(',',':')),encoding='utf-8')
# Standalone SVG data preview, same paths. Styling intentionally neutral; parent controls final appearance.
styles={'land':('fill="#292f2e"',''),'wetlands':('fill="#4e5e4d" opacity="0.75"',''),'industrial':('fill="#46483d"',''),'water':('fill="#101b20"',''),'buildings':('fill="#7a796a" opacity="0.8"',''),'waterways':('fill="none" stroke="#31505a" stroke-width="0.5"',''),'roadsMinor':('fill="none" stroke="#737568" stroke-width="0.45"',''),'roadsMajor':('fill="none" stroke="#c0b58a" stroke-width="1"',''),'coastline':('fill="none" stroke="#95aa9d" stroke-width="0.8"','')}
svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H:.2f}"><title>Galveston Bay OpenStreetMap vector geography</title><desc>© OpenStreetMap contributors. https://www.openstreetmap.org/copyright</desc><rect width="100%" height="100%" fill="#101b20"/>'
for k in ['land','wetlands','industrial','water','buildings','waterways','roadsMinor','roadsMajor','coastline']:
 svg+=f'<path id="{k}" d="{resultlayers[k]["path"]}" {styles[k][0]} fill-rule="evenodd"/>'
svg+='</svg>'
(ROOT/'galveston-map-preview.svg').write_text(svg,encoding='utf-8')
print('JSON bytes:',(ROOT/'galveston-map.json').stat().st_size,'SVG bytes:',(ROOT/'galveston-map-preview.svg').stat().st_size)
# Matplotlib PNG for shape QA.
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon as Patch
fig,ax=plt.subplots(figsize=(12,H/100),facecolor='#101b20');ax.set_facecolor('#101b20')
for k,color in [('land','#292f2e'),('wetlands','#4e5e4d'),('industrial','#46483d'),('water','#101b20'),('buildings','#7a796a')]:
 gs=layers[k]
 if k=='buildings':gs=sorted(gs,key=lambda g:g.area,reverse=True)[:340]
 for g in gs:
  pp=[g] if g.geom_type=='Polygon' else list(g.geoms) if hasattr(g,'geoms') else []
  for pg in pp:
   if pg.geom_type=='Polygon':ax.add_patch(Patch(list(pg.exterior.coords),facecolor=color,edgecolor='none'))
for k,color,lw in [('waterways','#31505a',.4),('roadsMinor','#737568',.3),('roadsMajor','#c0b58a',.6),('coastline','#95aa9d',.5)]:
 for g in layers[k]:
  lines=[g] if g.geom_type=='LineString' else list(g.geoms)
  for ln in lines:
   if ln.geom_type=='LineString':xx,yy=ln.xy;ax.plot(xx,yy,color=color,linewidth=lw)
for l in result['labels']:
 x,y=project(*l['coordinates']);ax.text(x,y,l['name'],fontsize=8,color='white')
ax.set_xlim(0,W);ax.set_ylim(0,H);ax.set_aspect('equal');ax.axis('off');fig.subplots_adjust(0,0,1,1)
fig.savefig(ROOT/'galveston-map-preview.png',dpi=100,facecolor=fig.get_facecolor())



