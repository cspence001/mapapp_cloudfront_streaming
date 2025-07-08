# mapapp_cloudfront_streaming
<br>

GIS proof-of-concept app 
<br>Python/JavaScript web application to visualize geospatial data
<br>integrates S3-Cloudfront database for storage & delivery
<br>
<br>chloropleth (by state, county, block group, blocks), point-mapping, filterable functions enabling users to analyze loan distribution patterns across the U.S.
<br>uses custom in-data key system for parsing
<br>built with: geopandas, leaflet, mapbox
<br>
<br>currently: working on session state storage to optimize client-side data cacheing and delivery in tandem with integration of logging system
<br>
---
virtual environment within project directory<br>
```
pipenv shell
cd map/
python3 app.py
```
