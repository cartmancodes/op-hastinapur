import React, { useState } from 'react'
import ReactImageZoom from 'react-image-zoom';
import { MapContainer, Marker, Polygon, Polyline, Popup, TileLayer, Tooltip, GeoJSON } from 'react-leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import { geojson } from './heatmap';
import { Button, IconButton, colors } from '@mui/material';
import { Box, FormControl, InputLabel, Select, MenuItem, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { data } from './latlongPoints'
import L, { divIcon } from "leaflet";
import "./mapstyle.css";
// import wardLayer from './wardLayer.kml'
import ReactLeafletKml from "react-leaflet-kml";
import MapPopup from './MapPopup';
import { isMarkerInsidePolygon } from './UtilityFunctions';
// delete L.Icon.Default.prototype._getIconUrl;

const LeafIcon = L.Icon.extend({
	options: {}
});

// const greenIcon = new LeafIcon({
// 	iconUrl:
// 		"greenMarker.png"
// }),
const redIcon = new LeafIcon({
	iconUrl:
		"redMarker.png"
})

// const setColor = ({ properties }) => {
//     return { weight: 1 };
// };

// const customMarkerIcon = (name) =>
//     divIcon({
//         html: name,
//         className: "icon"
//     });

// const setIcon = ({ properties }, latlng) => {
//     return L.marker(latlng, { icon: customMarkerIcon(properties.Name) });
// };
// const setColor = ({ properties }) => {
// 	return { weight: 1 };
// };

const customMarkerIcon = (name) =>
	divIcon({
		html: name,
		className: "icon"
	});

const setIcon = ({ properties }, latlng) => {
	return L.marker(latlng, { icon: customMarkerIcon("") });
};

const kmlData = `<?xml version="1.0" encoding="utf-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
	<Document id="root_doc">
		<Schema name="jhs_ward_layer" id="jhs_ward_layer">
			<SimpleField name="id" type="float"></SimpleField>
		</Schema>
		<Folder>
			<name>jhs_ward_layer</name>
			<Placemark>
				<Style>
					<LineStyle>
						<color>ff0000ff</color>
					</LineStyle>
					<PolyStyle>
						<fill>0</fill>
					</PolyStyle>
				</Style>
				<ExtendedData>
					<SchemaData schemaUrl="#jhs_ward_layer">
						<SimpleData name="id">1</SimpleData>
					</SchemaData>
				</ExtendedData>
				<MultiGeometry>
					<Polygon>
						<outerBoundaryIs>
							<LinearRing>
								<coordinates>78.5166646257047,25.5354554252774
									78.5191636551355,25.5338727066378
									78.5241617139972,25.5322899879983
									78.5300760836501,25.5310404732829
									78.5401555023545,25.5240431908766
									78.541904822956,25.5268754242315
									78.5444871533679,25.5297076575865
									78.5470694837797,25.5304573664157
									78.550984629888,25.5297909585675
									78.5564824946358,25.528458142871
									78.5616471554596,25.5291245507193
									78.5638962819473,25.5285414438521
									78.5672283211884,25.5276251330608
									78.5683112339418,25.5242930938197
									78.5684778359038,25.5175457143564
									78.5676448260935,25.5103818299881
									78.5696440496382,25.5037177515059
									78.5754751183101,25.5038010524869
									78.5786405555892,25.5031346446387
									78.5796922304746,25.5018747173006
									78.5895529841038,25.5022183338474
									78.5984661890737,25.5008022171699
									78.6034642479353,25.4993027995114
									78.5997990047701,25.4938882357446
									78.6031310440112,25.4934717308395
									78.6072960930626,25.491805711219
									78.6117110450571,25.4901396915984
									78.6260075759259,25.4845481132469
									78.6380029171938,25.4875469485639
									78.6586615604887,25.4865473367916
									78.6489986466894,25.4702203445102
									78.6473326270689,25.4702203445102
									78.6406685485867,25.4585582071663
									78.6363368975733,25.4435640305814
									78.6413349564349,25.4335679128581
									78.6420013642831,25.4235717951348
									78.6433341799796,25.4119096577909
									78.6400021407385,25.4069115989293
									78.6330048583322,25.4045791714605
									78.6286732073187,25.4075780067775
									78.6300060230152,25.4162413088043
									78.6090141757962,25.4185737362731
									78.5983516502247,25.4099104342463
									78.5976852423765,25.3945830537372
									78.5923539795908,25.3852533438621
									78.5800254343987,25.3859197517103
									78.5717473994091,25.3895329317624
									78.5717473994091,25.3883146549149
									78.5711538799193,25.3876586596893
									78.5709039769762,25.3859509895783
									78.5704770594484,25.3848160137117
									78.5701646807696,25.3837122757131
									78.5686027873753,25.3843682709387
									78.5672283211884,25.3840142417694
									78.5682799960738,25.3833894844117
									78.5677489523198,25.3829833921291
									78.5688735155637,25.381306959886
									78.5704249963353,25.3809737559619
									78.5693316709593,25.3797034160012
									78.5628550196844,25.3727686093306
									78.5576695336154,25.3668125891872
									78.5547748245247,25.3660837056032
									78.5515677367552,25.3609190447795
									78.5476734158921,25.3626683653811
									78.5432376386524,25.3655422492265
									78.5410509879004,25.3670833173755
									78.5388018614127,25.3667501134514
									78.535823851341,25.363230647003 78.532460574232,25.359055185329
									78.5307112536304,25.3623872245701
									78.5287536805762,25.3633868363424
									78.532710477175,25.3690096525618
									78.5335434869853,25.3727998471985
									78.5318358168743,25.3740910124044
									78.5306696031399,25.377381401155
									78.5290452340098,25.3782560614558
									78.528003971747,25.3829625668839
									78.5319607683458,25.3875024703499
									78.5322523217794,25.3901264512522
									78.5346680502292,25.3912926649866
									78.5317941663837,25.3948329566803
									78.5299615448011,25.3966239277724
									78.5285454281237,25.3977484910163
									78.5252550393731,25.3983315978835
									78.5224644565086,25.3987897532791
									78.5195072716822,25.4007056758427
									78.514384261349,25.4040377150838
									78.5113021250509,25.4072448028534
									78.5061374642273,25.4128676190727
									78.5054710563791,25.4188652897067
									78.5064706681514,25.4254460672079
									78.5147174652731,25.4282783005628
									78.520548533945,25.4321101456901
									78.5222145535656,25.4360252917984
									78.5201320290399,25.4435223800909
									78.5176329996091,25.4458548075596
									78.5183827084383,25.4480206330664
									78.520381931983,25.4491035458197
									78.5228809614138,25.4507695654403
									78.5237139712241,25.4552678184158
									78.5272126124273,25.4644725768193
									78.5331269820802,25.4720946165833
									78.535376108568,25.4777174328026
									78.538458244866,25.4867555892441
									78.5366256232834,25.4905874343714
									78.5344597977767,25.4920868520299
									78.5347097007197,25.4957520951951
									78.5340432928715,25.5009167560188
									78.532377273251,25.5023328726963
									78.5297116418581,25.5011666589619
									78.5259630977119,25.5007501540568
									78.520381931983,25.5020829697532
									78.517216494704,25.5025827756394
									78.5152172711593,25.5039988923168
									78.5125516397664,25.5043737467314
									78.5123850378043,25.5088719997069
									78.5087197946392,25.5095800580457
									78.5073869789427,25.5114959806093
									78.5056376583411,25.5115376310998
									78.5044714446068,25.5176602532054
									78.5065539691324,25.525657147384
									78.5074702799237,25.5292807400587
									78.5166646257047,25.5354554252774</coordinates>
							</LinearRing>
						</outerBoundaryIs>
					</Polygon>
				</MultiGeometry>
			</Placemark>
		</Folder>
	</Document>
</kml>`;

const enchrochmentData = `<?xml version="1.0" encoding="utf-8" ?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document id="root_doc">
<Schema name="encroachment_roads" id="encroachment_roads">
	<SimpleField name="id" type="float"></SimpleField>
	<SimpleField name="Road Name" type="string"></SimpleField>
	<SimpleField name="Score" type="int"></SimpleField>
	<SimpleField name="Income" type="int"></SimpleField>
	<SimpleField name="Latitude" type="float"></SimpleField>
	<SimpleField name="Longitude" type="float"></SimpleField>
	<SimpleField name="Reasons" type="string"></SimpleField>
</Schema>
<Folder><name>encroachment_roads</name>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
      <MultiGeometry><LineString><coordinates>78.5778467350962,25.4564348856462 78.5775729147307,25.4559083080203 78.5772479411101,25.4554238566044 78.5767725167392,25.4547648823182 78.576667201214,25.454611422553 78.576667201214,25.454611422553</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>7dff0000</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Sayar gate</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">1</SimpleData>
		<SimpleData name="Latitude">25.4547873862</SimpleData>
		<SimpleData name="Longitude">78.5775374060</SimpleData>
		<SimpleData name="Reasons">Vendors</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5778708072162,25.4552493337341 78.577774518736,25.4548641798134 78.577774518736,25.454659566793 78.5774736172355,25.4546716028531 78.577232896035,25.4547197470931 78.5769440305945,25.4545873504329</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">rani mahal</SimpleData>
		<SimpleData name="Score">3</SimpleData>
		<SimpleData name="Income">2</SimpleData>
		<SimpleData name="Latitude">25.4583705028</SimpleData>
		<SimpleData name="Longitude">78.5810203116</SimpleData>
		<SimpleData name="Reasons">Commercial Vehicle, Parking</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.580575911706,25.4584358806248 78.5807775157114,25.4584358806248 78.5809971738068,25.4584027814598 78.5812168319022,25.4583245470696 78.5814515350726,25.4582372856345</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Subhash Ganj- Khoa Mandi</SimpleData>
		<SimpleData name="Score">3</SimpleData>
		<SimpleData name="Income">2</SimpleData>
		<SimpleData name="Latitude">25.4590562238</SimpleData>
		<SimpleData name="Longitude">78.5817953224</SimpleData>
		<SimpleData name="Reasons">Parking, Commercial Vehicle, Vendors</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5819269594435,25.4598862258574 78.5818848332334,25.459645504657 78.5818788152034,25.4594348736066 78.5818968692934,25.4591941524062 78.5818607611134,25.4590015754458 78.5817283644531,25.4586826198553 78.5815779137028,25.4583997724448 78.5814996793127,25.4582733938145</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Medical College</SimpleData>
		<SimpleData name="Score">3</SimpleData>
		<SimpleData name="Income">2</SimpleData>
		<SimpleData name="Latitude">25.4588741986</SimpleData>
		<SimpleData name="Longitude">78.6154335752</SimpleData>
		<SimpleData name="Reasons">Parking, Commercial Vehicle, Vendors, Taxi Stops</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.6241915842095,25.4651820922669 78.6200030353219,25.4620045724212 78.6176198954376,25.4603195240182 78.6145627361921,25.4581530332143 78.610614908505,25.4550958739688 78.6061856384171,25.4534830419259 78.6061856384171,25.4534830419259</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Bus Stand</SimpleData>
		<SimpleData name="Score">3</SimpleData>
		<SimpleData name="Income">1</SimpleData>
		<SimpleData name="Latitude">25.4455583209</SimpleData>
		<SimpleData name="Longitude">78.5904172125</SimpleData>
		<SimpleData name="Reasons">Parking, Commercial Vehicle, Vendors, Taxi Stand</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5874093847833,25.4447207902302 78.5888296398659,25.4450698359708 78.5903822916087,25.4455994226117 78.5912127797502,25.4458762519922 78.5923802775723,25.4460567928926 78.5934394508542,25.4463336222731</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Buss stand to Mandi Road</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">1</SimpleData>
		<SimpleData name="Latitude">25.4491592859</SimpleData>
		<SimpleData name="Longitude">78.5986227082</SimpleData>
		<SimpleData name="Reasons">Vendors, Commercial Vehicles</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.595569833478,25.4471761464746 78.5971826655209,25.4481751394564 78.5989880745242,25.4493667093985 78.6016239716689,25.4512202626418</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>7dff0000</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Kotawali Manik Chawk</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">2</SimpleData>
		<SimpleData name="Latitude">25.4596090811</SimpleData>
		<SimpleData name="Longitude">78.5777846886</SimpleData>
		<SimpleData name="Reasons">Vendors, Autos, Taxi Stand</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5767213634842,25.4600065864576 78.5773111304253,25.4598501176773 78.577732392526,25.459645504657 78.578261979167,25.4593927473965 78.578827673988,25.4591520261961</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>7dff0000</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Mobile market kotwali</SimpleData>
		<SimpleData name="Score">3</SimpleData>
		<SimpleData name="Income">2</SimpleData>
		<SimpleData name="Latitude">25.4605759044</SimpleData>
		<SimpleData name="Longitude">78.5785657910</SimpleData>
		<SimpleData name="Reasons">Parking</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5793572606289,25.4610657597395 78.5789721067082,25.4611259400396 78.578839710048,25.4609213270193 78.5785388085475,25.4605482091586 78.5784064118872,25.4603195240182 78.5781055103867,25.4601510191779 78.5780694022066,25.4601510191779 78.5779490416064,25.4600186225176 78.5779008973663,25.4598260455573</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>7dff0000</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Bada Bazar</SimpleData>
		<SimpleData name="Score">3</SimpleData>
		<SimpleData name="Income">1</SimpleData>
		<SimpleData name="Latitude">25.4613689923</SimpleData>
		<SimpleData name="Longitude">78.5815585684</SimpleData>
		<SimpleData name="Reasons">Vendors, Autos</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5822098068541,25.4610898318596 78.5814635711327,25.4613907333601 78.5811145253921,25.4615833103205 78.5809219484318,25.4616795988006</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">hadfc bank elite</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">3</SimpleData>
		<SimpleData name="Latitude">25.4488876222</SimpleData>
		<SimpleData name="Longitude">78.5677115477</SimpleData>
		<SimpleData name="Reasons">Parking, Vendors</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5674866964326,25.4489288977152 78.5676175885853,25.4489063301027 78.5678853909208,25.4488536723401 78.5679365441759,25.4488476543101</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Vandana</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">3</SimpleData>
		<SimpleData name="Latitude">25.4486812441</SimpleData>
		<SimpleData name="Longitude">78.5699557878</SimpleData>
		<SimpleData name="Reasons">Parking</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5699074490044,25.4487152576498 78.5699676293045,25.4486776449623 78.5699977194546,25.4486400322747</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Yatrik</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">3</SimpleData>
		<SimpleData name="Latitude">25.4469755312</SimpleData>
		<SimpleData name="Longitude">78.5695698363</SimpleData>
		<SimpleData name="Reasons">Parking</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5695915024288,25.4472137591621 78.5695734483388,25.4470482633368 78.5695734483388,25.4469309117516 78.5695403491737,25.4467383347913</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>7dff0000</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Jail Chauraha</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">1</SimpleData>
		<SimpleData name="Latitude">25.4432396305</SimpleData>
		<SimpleData name="Longitude">78.5757744794</SimpleData>
		<SimpleData name="Reasons">Mechanics, Vendors, Taxi Stand</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.575841226595,25.4435638239606 78.5757509561449,25.4431004356497 78.5756907758448,25.4429198947494</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Jail chauraha- Opp</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">1</SimpleData>
		<SimpleData name="Latitude">25.4423557866</SimpleData>
		<SimpleData name="Longitude">78.5756336821</SimpleData>
		<SimpleData name="Reasons">Bus Stop, Vendors</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5760578756754,25.44326292246 78.575823172505,25.4431305257998 78.5757329020548,25.442703245669 78.5754681087344,25.4418125772274 78.5753296940441,25.4413431708866</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">jail-kacheri chauraha</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">3</SimpleData>
		<SimpleData name="Latitude">25.4442104009</SimpleData>
		<SimpleData name="Longitude">78.5778089710</SimpleData>
		<SimpleData name="Reasons">Parking, Shops</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5767379130666,25.4437684369809 78.5777730142285,25.4442017351417 78.5783507451095,25.4445146727023 78.5789044038705,25.4444665284622</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Jhokan bagh</SimpleData>
		<SimpleData name="Score">1</SimpleData>
		<SimpleData name="Income">3</SimpleData>
		<SimpleData name="Latitude">25.4478374967</SimpleData>
		<SimpleData name="Longitude">78.5766693869</SimpleData>
		<SimpleData name="Reasons">Shops, parking, Autos</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5771651931974,25.4487212756798 78.5767318950366,25.448251869339 78.5765513541363,25.447698210578 78.5764550656561,25.4470602993968 78.576394885356,25.4468436503165</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>7dff0000</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Govind Chauraha- Jhokan Bagh</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">3</SimpleData>
		<SimpleData name="Latitude">25.4496758570</SimpleData>
		<SimpleData name="Longitude">78.5773431111</SimpleData>
		<SimpleData name="Reasons">Shops, Parking</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5771411210773,25.4503461437828 78.5773577701577,25.4500332062222 78.5773938783378,25.4495878720014 78.5773938783378,25.4492628983808 78.5773216619776,25.4489619968803</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>7dff0000</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Govind - Elite</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">2</SimpleData>
		<SimpleData name="Latitude">25.4499564387</SimpleData>
		<SimpleData name="Longitude">78.5756925095</SimpleData>
		<SimpleData name="Reasons">Vendors, parking, Shops</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5769244719969,25.4503822519628 78.5757449381148,25.4501415307624 78.5752394235939,25.4498406292618 78.5749505581534,25.4495036195812 78.5746376205928,25.4492027180807</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>7dff0000</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Elite Jeevan Shah</SimpleData>
		<SimpleData name="Score">3</SimpleData>
		<SimpleData name="Income">1</SimpleData>
		<SimpleData name="Latitude">25.4500910526</SimpleData>
		<SimpleData name="Longitude">78.5698712676</SimpleData>
		<SimpleData name="Reasons">parking, Vendors</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5699435571844,25.4513932810046 78.5699074490043,25.4508035140636 78.5699194850643,25.4501054225823 78.5698111605242,25.449383258981 78.569738944164,25.44879349204</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
		<SimpleData name="Road Name">Jeevan-RLB</SimpleData>
		<SimpleData name="Score">2</SimpleData>
		<SimpleData name="Income">1</SimpleData>
		<SimpleData name="Latitude">25.4532550737</SimpleData>
		<SimpleData name="Longitude">78.5705880365</SimpleData>
		<SimpleData name="Reasons">Mechanic</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.570822189566,25.4537042045288 78.5704490717053,25.4529820409275 78.5703407471651,25.4528135360872</coordinates></LineString></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
      <MultiGeometry></MultiGeometry>
  </Placemark>
  <Placemark>
	<Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
	<ExtendedData><SchemaData schemaUrl="#encroachment_roads">
		<SimpleData name="id">1</SimpleData>
	</SchemaData></ExtendedData>
      <MultiGeometry><LineString><coordinates>78.5783765309845,25.4464385535175 78.5787166108255,25.4455491139334 78.5789520507154,25.4448427942636</coordinates></LineString></MultiGeometry>
  </Placemark>
</Folder>
</Document></kml>
`;

const enchrochmentDataWithMedia = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Urination points</name>
    <Style id="icon-1899-9C27B0-labelson">
      <IconStyle>
        <color>ffb0279c</color>
        <scale>1</scale>
        <Icon>
          <href>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>
        </Icon>
        <hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/>
      </IconStyle>
    </Style>
    <Placemark>
      <name>T1 P1</name>
      <description><![CDATA[<img src="https://doc-0c-0s-mymaps.googleusercontent.com/untrusted/hostedimage/ltbtr56dsv8l0lhgq4hd7gmrfk/s4mohsoqlt0mltvptkidk6i9h0/1697983475500/8AE0li_iM5vtQQwsLcDqdp-kpBjOzk1B/03630732761502837539/5AJ9UNGqTyKcwrvtQ5Q7Faz449vwYaZpEFJTZZ4p9fTnMpNGRRDSG_GDtBzZN5DjZllpvDjyqXtguJnHfz5td9bYQWLS7iwnjlhZfTgKFRT8W005ky4EEEBuWHGFbTEANv0vzZ6IlF8xMKIWx2zReKd3Bc_7hn5x2MJ8le5IrmtPx3w8D43S2cnkOd0MUC5uXJyhAnMUgZSIs9pFcYqo6ByHKJux7jh85HWPboipQZ4kXQ_nt5WM?session=0&fife" height="200" width="auto" /><br><br>]]></description>
      <styleUrl>#icon-1899-9C27B0-labelson</styleUrl>
      <ExtendedData>
        <Data name="gx_media_links">
          <value><![CDATA[https://doc-0c-0s-mymaps.googleusercontent.com/untrusted/hostedimage/ltbtr56dsv8l0lhgq4hd7gmrfk/s4mohsoqlt0mltvptkidk6i9h0/1697983475500/8AE0li_iM5vtQQwsLcDqdp-kpBjOzk1B/03630732761502837539/5AJ9UNGqTyKcwrvtQ5Q7Faz449vwYaZpEFJTZZ4p9fTnMpNGRRDSG_GDtBzZN5DjZllpvDjyqXtguJnHfz5td9bYQWLS7iwnjlhZfTgKFRT8W005ky4EEEBuWHGFbTEANv0vzZ6IlF8xMKIWx2zReKd3Bc_7hn5x2MJ8le5IrmtPx3w8D43S2cnkOd0MUC5uXJyhAnMUgZSIs9pFcYqo6ByHKJux7jh85HWPboipQZ4kXQ_nt5WM?session=0&fife]]></value>
        </Data>
      </ExtendedData>
      <Point>
        <coordinates>
          78.5786283,25.4543344,0
        </coordinates>
      </Point>
    </Placemark>
    <Placemark>
      <name>T1 Point 2</name>
      <description><![CDATA[<img src="https://doc-0s-0s-mymaps.googleusercontent.com/untrusted/hostedimage/ltbtr56dsv8l0lhgq4hd7gmrfk/f8k1at7ok6n3nbiepfuve79dko/1697983475500/8AE0li_iM5vtQQwsLcDqdp-kpBjOzk1B/03630732761502837539/5AJ9UNGqZOerSwx5mxyxm6TpMhxaIJip86cjqxa44Wt9Sj5V9NUdv8RQUfkU5u2Tdhh1Msnqp0YHsdGkb17JaO8p_3GrT6U31bPBYGXYOW6wMitTxPJeLJgzICC9K2sTGFKS9x2GsWGYyF6L1eG53Qy_FVhxUkpAQ8lZ2qt8yq3xEgFbAeBU2BYw78SYyA6cyWzCTFhbdKflIaMePs723Ti8keRzO8zzrCyTl_L4PzMO4MrWiUns?session=0&fife" height="200" width="auto" /><br><br>]]></description>
      <styleUrl>#icon-1899-9C27B0-labelson</styleUrl>
      <ExtendedData>
        <Data name="gx_media_links">
          <value><![CDATA[https://doc-0s-0s-mymaps.googleusercontent.com/untrusted/hostedimage/ltbtr56dsv8l0lhgq4hd7gmrfk/f8k1at7ok6n3nbiepfuve79dko/1697983475500/8AE0li_iM5vtQQwsLcDqdp-kpBjOzk1B/03630732761502837539/5AJ9UNGqZOerSwx5mxyxm6TpMhxaIJip86cjqxa44Wt9Sj5V9NUdv8RQUfkU5u2Tdhh1Msnqp0YHsdGkb17JaO8p_3GrT6U31bPBYGXYOW6wMitTxPJeLJgzICC9K2sTGFKS9x2GsWGYyF6L1eG53Qy_FVhxUkpAQ8lZ2qt8yq3xEgFbAeBU2BYw78SYyA6cyWzCTFhbdKflIaMePs723Ti8keRzO8zzrCyTl_L4PzMO4MrWiUns?session=0&fife]]></value>
        </Data>
      </ExtendedData>
      <Point>
        <coordinates>
          78.5766296,25.4740888,0
        </coordinates>
      </Point>
    </Placemark>
  </Document>
</kml>`

const wardDivision = {
	"type": "FeatureCollection",
	"name": "Ward boundary Data Jhansi",
	"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
	"features": [
		{
			"type": "Feature",
			"properties": { "id": 1, "Ward Name": "Dadiyapura Second", "Ward Numbe": 27.0 },
			"geometry": { "type": "MultiPolygon", "coordinates": [[[[78.598355515154481, 25.448579044062473], [78.596735679602929, 25.451008797389807], [78.594319704668038, 25.450387546692262], [78.592939147562376, 25.449421156718305], [78.592110813298987, 25.448834419948401], [78.591558590456728, 25.447764488191517], [78.587313377356836, 25.454253106588094], [78.586346987382882, 25.455081440851487], [78.586554070948722, 25.456289428318936], [78.587071779863351, 25.457152276509969], [78.586864696297496, 25.458532833615624], [78.587071779863351, 25.459119570385528], [78.587382405212111, 25.459844362865997], [78.58755497485032, 25.460879780695237], [78.588245253403144, 25.461811656741556], [78.588970045883613, 25.462191309945609], [78.588970045883613, 25.462607393736302], [78.589475367036897, 25.462444443358642], [78.589607427059534, 25.462389504868757], [78.589880167980013, 25.462142177524008], [78.5900495019375, 25.462012750295347], [78.590389787692828, 25.461892490828738], [78.59081258330643, 25.462134088322227], [78.590011711236826, 25.46249067046848], [78.58922831313545, 25.463224310493583], [78.589423397718861, 25.464317094245544], [78.590294874391802, 25.463820956535702], [78.591235378920032, 25.464049611306326], [78.59037266554887, 25.464394548352665], [78.589862506555903, 25.464680366815948], [78.589725529405598, 25.464763415954327], [78.590063118760312, 25.465310245995408], [78.590902238626057, 25.464829208128908], [78.592095126250229, 25.464846465092727], [78.592300996436023, 25.466758954626194], [78.593759209878868, 25.468113626286115], [78.599869793391136, 25.465175216677746], [78.599869793391136, 25.464409480407053], [78.599593681970006, 25.462752811880268], [78.599869793391136, 25.46206253332744], [78.601871601194333, 25.461993505472158], [78.602354796181316, 25.461027115498201], [78.602976046878865, 25.460612948366503], [78.603252158299995, 25.458127945576326], [78.60339021401056, 25.456609332760102], [78.604149520418673, 25.455297803509733], [78.604977854682062, 25.45426238568049], [78.605184938247916, 25.4530198842854], [78.604158148900524, 25.452666116527077], [78.598355515154481, 25.448579044062473]]]] }
		},

		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Bijauli", "Ward Numbe": 22.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.580471800122012, 25.443153643170628], [78.58070476913359, 25.443835293241545], [78.580861247742604, 25.444417287820787], [78.580723192032039, 25.445521733505313], [78.585762225467676, 25.446246525985782], [78.586088941845659, 25.446279310742661], [78.586807838560176, 25.444654604167873], [78.596219945543012, 25.447074860249174], [78.604158148900524, 25.452666116527077], [78.607057318822399, 25.451078475855571], [78.608575931638626, 25.450664308723876], [78.610991906573517, 25.450388197302743], [78.618544342806331, 25.446367984289662], [78.618170803522801, 25.445728817071181], [78.619827472049593, 25.445107566373636], [78.621415112721095, 25.444279232110244], [78.622312474839774, 25.443381869991565], [78.619413304917884, 25.440206588648564], [78.617307955331768, 25.437445474437254], [78.618930109930915, 25.436548112318579], [78.613338853653019, 25.428264769684649], [78.610301628020579, 25.428955048237476], [78.606021900993056, 25.429576298935018], [78.603605926058151, 25.429300187513888], [78.602294396807778, 25.429093103948041], [78.601697086793891, 25.428744673106607], [78.598633763357725, 25.426965104596896], [78.59856473550245, 25.423030516845781], [78.599047930489419, 25.418819817673533], [78.599360712958273, 25.415736213950826], [78.601175208893181, 25.415354214806634], [78.598974588393261, 25.413710947462462], [78.59731791986647, 25.411985251080392], [78.595247084207998, 25.411018861106434], [78.593885193778817, 25.410303501513564], [78.593010150272264, 25.40883342842255], [78.593631400969812, 25.40482981281615], [78.594528763088491, 25.402620921447102], [78.599360712958273, 25.403656339276345], [78.60185434423019, 25.40440701720248], [78.601940629049295, 25.403613196866729], [78.601036473259498, 25.401660237247533], [78.601215836568826, 25.40111093711273], [78.601819830302546, 25.399799407862357], [78.601336635315576, 25.398694962177832], [78.599818022499349, 25.398090968444109], [78.598506493248976, 25.397210863289253], [78.598075069153452, 25.394173637656813], [78.598834375561566, 25.392585996985314], [78.592889351525315, 25.389436601088018], [78.592890495796212, 25.388921858336246], [78.592591668899402, 25.388569438656027], [78.592121416635308, 25.388332155403489], [78.591538994106358, 25.38706808280363], [78.59090048644498, 25.386170720684955], [78.587914294282484, 25.386250602102919], [78.585986565997004, 25.386520174202325], [78.585089203878354, 25.387115539454136], [78.584643059955141, 25.387842432653734], [78.584364411397885, 25.388047415500456], [78.583073692015631, 25.388277339165477], [78.582863055545488, 25.388150957283386], [78.581059702826224, 25.387037883116953], [78.580214111599005, 25.387029254635046], [78.579394405817524, 25.388064672464285], [78.578704127264714, 25.388539238969351], [78.576969802400754, 25.389660941617691], [78.576357180185113, 25.390402991061979], [78.575546102885539, 25.391209754120606], [78.574208688189444, 25.391602350047524], [78.572828131083796, 25.391649806698027], [78.572707332337046, 25.390717930651707], [78.570774552389125, 25.390890500289917], [78.568134236924564, 25.391615292770386], [78.566405495195937, 25.391661988084259], [78.566080658229907, 25.389570342557629], [78.565890831627883, 25.387948187958486], [78.565683748062042, 25.386170720684959], [78.565114268255954, 25.384755649651666], [78.564950327099666, 25.383866916014899], [78.564691472642352, 25.38347000584702], [78.563414457319595, 25.382003163922263], [78.562448067345656, 25.380346495395482], [78.561921729949134, 25.379552675059731], [78.561438534962136, 25.378154860990254], [78.564648253678911, 25.376059383245238], [78.566011630374604, 25.376265223451895], [78.567792023598727, 25.376421774339555], [78.568824515477374, 25.377766579304293], [78.569014342079413, 25.375488660079959], [78.568686459766823, 25.373745706734077], [78.567512986227015, 25.369673063272394], [78.560679228554022, 25.365462364100146], [78.555640195118386, 25.363667639862793], [78.551981718788397, 25.358559578571871], [78.54383643186506, 25.368982784719556], [78.540471323919974, 25.372054524279619], [78.536226110820081, 25.374539527069796], [78.532187981286057, 25.375057235984425], [78.524318805783821, 25.370570425391048], [78.524108455457011, 25.373428715125669], [78.52333515884601, 25.37500546509294], [78.528909158160104, 25.378750226242047], [78.529478637966193, 25.380079012456239], [78.528529504956055, 25.381269742959866], [78.526869647636559, 25.381180867020774], [78.526762442420917, 25.384112059368686], [78.530824681144196, 25.387050825839786], [78.533949375031341, 25.389686283919449], [78.534552185329474, 25.390467704676279], [78.53693364633672, 25.39069204520597], [78.535242463882298, 25.39573107864161], [78.533455125534175, 25.399994822161855], [78.532999058585617, 25.40133959188331], [78.531188448460142, 25.402264483708894], [78.531609872998374, 25.40303508857879], [78.533370083308085, 25.405140438164914], [78.535337377183637, 25.410697180515175], [78.538926825658351, 25.416771631780058], [78.542136620929, 25.415943297516666], [78.544310998370406, 25.418704411727976], [78.546209264390683, 25.417979619247504], [78.548590725397943, 25.418324758523916], [78.551489895319818, 25.418083161030427], [78.554320037386404, 25.417358368549959], [78.554803232373388, 25.416253922865433], [78.552801424570191, 25.415045935397988], [78.552456285293772, 25.412560932607807], [78.553146563846596, 25.410524610876966], [78.554320037386404, 25.409213081626596], [78.556080247696116, 25.408936970205463], [78.559738724026104, 25.408350233435559], [78.562223726816285, 25.407452871316885], [78.560774141855347, 25.404829812816143], [78.561326364697607, 25.403759881059258], [78.562844977513819, 25.403311199999919], [78.567469843817776, 25.403552797493411], [78.570783180871345, 25.404622729250292], [78.57105929229246, 25.406106828138871], [78.5740965179249, 25.407970580231506], [78.578203675314228, 25.409558220903008], [78.580343538827989, 25.411939681910262], [78.578721384228842, 25.414321142917519], [78.575615130741127, 25.415736213950815], [78.571680542990009, 25.416806145707696], [78.568125608442941, 25.418186702813351], [78.569161026272184, 25.419843371340136], [78.570748666943686, 25.424157612295307], [78.568160122370585, 25.425124002269264], [78.559255529039106, 25.427609005059445], [78.558358166920428, 25.428299283612272], [78.556632470538361, 25.429886924283778], [78.553457189195356, 25.434132137383664], [78.553823899676658, 25.435102841598582], [78.556446958177403, 25.439727707902524], [78.560588629494376, 25.443248128521944], [78.563535256066629, 25.441552631826561], [78.566054772784454, 25.439964991155058], [78.568850400923409, 25.439792421516849], [78.569022970561605, 25.440758811490809], [78.569182597477095, 25.442273110066083], [78.569723684606998, 25.441675943877915], [78.570647282281413, 25.441193471267042], [78.572612419036318, 25.440620755780245], [78.578617842445922, 25.439033115108735], [78.582690485907605, 25.438480892266472], [78.58255243019704, 25.439274712602224], [78.581344442729588, 25.442035826813534], [78.580392433582759, 25.443017586246196], [78.580471800122012, 25.443153643170628]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Khushipura Second", "Ward Numbe": 14.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.58074919867488, 25.445525474186816], [78.580747911543156, 25.445578246587441], [78.580803996675584, 25.445772387430427], [78.581390733445488, 25.446445409019432], [78.581891185396273, 25.446721520440562], [78.582797175996859, 25.448947668773428], [78.583254485538106, 25.449655204290078], [78.583806708380365, 25.450500795517289], [78.584246760957797, 25.450561194890664], [78.584574643270386, 25.449741489109179], [78.584885268619161, 25.448386817449258], [78.585402977533789, 25.447394542029574], [78.585808516183576, 25.446764662850118], [78.586035560517857, 25.446273954127651], [78.585762225467676, 25.446246525985782], [78.58074919867488, 25.445525474186816]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Civil Lines South Part 1", "Ward Numbe": 55.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.577257151330258, 25.450754796453548], [78.577623861811446, 25.450864809597906], [78.577684376538727, 25.450883247678874], [78.577899973232576, 25.450948937296534], [78.578003532656339, 25.450976350085178], [78.57808836365362, 25.450981516040766], [78.578084324299724, 25.450849339405327], [78.577888635355364, 25.450797386588242], [78.577978168849882, 25.450886920082763], [78.577598515645832, 25.450507266878709], [78.577460459935267, 25.45028292634904], [78.577425946007622, 25.449454592085647], [78.577253376369427, 25.448143062835275], [78.578288794198656, 25.446900561440184], [78.579056729088691, 25.444535278836504], [78.579157488555623, 25.44431506226957], [78.579135551360537, 25.444313746037864], [78.581344442729588, 25.442035826813534], [78.58255243019704, 25.439274712602224], [78.582690485907605, 25.438480892266472], [78.578617842445922, 25.439033115108735], [78.574954660391612, 25.440001542548384], [78.574948580513777, 25.440183938883532], [78.575155664079617, 25.440805189581074], [78.575414518536931, 25.441788836518853], [78.57581142870481, 25.442824254348096], [78.57591497048773, 25.443635331647666], [78.574275558924768, 25.444411895019599], [78.572808717000015, 25.445361028029737], [78.570789652232989, 25.447397349760578], [78.569887907897424, 25.448272176354784], [78.56992576831712, 25.448811687335684], [78.56985674046183, 25.45001967480313], [78.569684170823635, 25.451883426895765], [78.570417177715186, 25.452809972975817], [78.570529805478117, 25.45302480000511], [78.571213439032178, 25.452733415211576], [78.573474101292689, 25.451559941671771], [78.575941847119054, 25.451767025237618], [78.576597611744234, 25.450869663118944], [78.5767091915896, 25.450871057867012], [78.576965940065776, 25.450774210537848], [78.577257151330258, 25.450754796453548]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Talaiya", "Ward Numbe": 47.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.577257151330258, 25.450754796453548], [78.576965940065776, 25.450774210537848], [78.5767091915896, 25.450871057867012], [78.576597611744234, 25.450869663118944], [78.575941847119054, 25.451767025237618], [78.573474101292689, 25.451559941671771], [78.571213439032178, 25.452733415211576], [78.570529805478117, 25.45302480000511], [78.571349053761509, 25.454587440249348], [78.571780477857018, 25.45662376198019], [78.573299090673245, 25.456313136631415], [78.573799542624045, 25.457348554460658], [78.572557041228961, 25.457710950700893], [78.57384612978737, 25.459552505784345], [78.573798430359275, 25.459273544338863], [78.573763916431645, 25.458790349351883], [78.573789801877368, 25.458281268919173], [78.573996885443222, 25.457746303040736], [78.574022770888959, 25.457478820101514], [78.574126312671879, 25.457288993499485], [78.574238482936721, 25.457228594126114], [78.574454194984483, 25.457056024487908], [78.574669907032231, 25.456831683958239], [78.574920133007637, 25.456650485838122], [78.574980532381005, 25.456624600392391], [78.575222129874504, 25.456546944055198], [78.575463727367989, 25.456521058609464], [78.575541383705186, 25.456503801645646], [78.575843380572039, 25.456460659236093], [78.576214405294181, 25.456434773790363], [78.576550916088692, 25.456426145308452], [78.576757999654532, 25.456521058609464], [78.577042739557584, 25.45666774280194], [78.577405135797818, 25.456857569403969], [78.577991872567722, 25.456978368150715], [78.578397411217509, 25.456995625114534], [78.578630380229086, 25.456969739668803], [78.578798635626356, 25.457145544987725], [78.578971205264565, 25.457322428866888], [78.579182603071374, 25.45746479881841], [78.579356304226991, 25.457578372650925], [78.579445010774705, 25.457425152250327], [78.579824663978755, 25.457183554756838], [78.58001449058078, 25.456803901552782], [78.580152546291345, 25.456165393891418], [78.580307858965739, 25.455733969795901], [78.580187060218989, 25.455371573555666], [78.579772893087295, 25.455319802664203], [78.579755636123465, 25.454905635532509], [78.5798591779064, 25.453991016450011], [78.57989369183403, 25.453852960739447], [78.580256088074265, 25.453732161992701], [78.580722026097433, 25.453525078426853], [78.580704769133604, 25.452972855584591], [78.578866902486681, 25.452705372645369], [78.578579466183029, 25.452684340720744], [78.578173927533243, 25.452671397997879], [78.578074699991276, 25.452628255588326], [78.578100585437014, 25.451381439952282], [78.57808836365362, 25.450981516040766], [78.578003532656339, 25.450976350085178], [78.577899973232576, 25.450948937296534], [78.577684376538727, 25.450883247678874], [78.577623861811446, 25.450864809597906], [78.577257151330258, 25.450754796453548]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Bahar Sainyar Gate", "Ward Numbe": 11.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.584048687080795, 25.451210764300566], [78.583670270510169, 25.451097239329375], [78.58315256159554, 25.451123124775108], [78.582902335620147, 25.451192152630391], [78.582747022945767, 25.451149010220838], [78.582660738126663, 25.45123529503994], [78.582496796970361, 25.451347465304774], [78.582324227332151, 25.451373350750508], [78.582246570994954, 25.451088610847467], [78.582134400730126, 25.450786613980604], [78.582289713404506, 25.4504501031861], [78.582289713404506, 25.45017399176497], [78.582298341886428, 25.449966908199119], [78.582065372874837, 25.449958279717212], [78.582048115911022, 25.450484617113741], [78.58188417475472, 25.450510502559471], [78.581970459573824, 25.450795242462515], [78.580512246130979, 25.450916041209258], [78.580451846757612, 25.45090741272735], [78.580331048010862, 25.45171849002692], [78.580054936589733, 25.451735746990742], [78.579865109987708, 25.45166671913546], [78.579554484638933, 25.45144237860579], [78.579157574471054, 25.451623576725908], [78.57884694912228, 25.45171849002692], [78.578790863989866, 25.451351779545732], [78.578885041961129, 25.451129627384681], [78.578639951535806, 25.451124240781922], [78.578517448969279, 25.451053018359538], [78.578185252415736, 25.450876134480374], [78.578084324299724, 25.450849339405327], [78.578100585437014, 25.451381439952282], [78.578074699991276, 25.452628255588326], [78.578173927533243, 25.452671397997879], [78.578579466183029, 25.452684340720744], [78.578866902486681, 25.452705372645369], [78.580704769133604, 25.452972855584591], [78.582758347828261, 25.453322309101974], [78.583431369417269, 25.452726943850163], [78.583802394139411, 25.451777810840024], [78.584048687080795, 25.451210764300566]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Bahar orcha Gate First", "Ward Numbe": 54.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.578885041961129, 25.451129627384681], [78.578790863989866, 25.451351779545732], [78.57884694912228, 25.45171849002692], [78.579157574471054, 25.451623576725908], [78.579554484638933, 25.45144237860579], [78.579865109987708, 25.45166671913546], [78.580054936589733, 25.451735746990742], [78.580331048010862, 25.45171849002692], [78.580451846757612, 25.45090741272735], [78.580512246130979, 25.450916041209258], [78.581970459573824, 25.450795242462515], [78.58188417475472, 25.450510502559471], [78.582048115911022, 25.450484617113741], [78.582065372874837, 25.449958279717212], [78.582298341886428, 25.449966908199119], [78.582289713404506, 25.45017399176497], [78.582289713404506, 25.4504501031861], [78.582134400730126, 25.450786613980604], [78.582246570994954, 25.451088610847467], [78.582324227332151, 25.451373350750508], [78.582496796970361, 25.451347465304774], [78.582660738126663, 25.45123529503994], [78.582747022945767, 25.451149010220838], [78.582902335620147, 25.451192152630391], [78.58315256159554, 25.451123124775108], [78.583670270510169, 25.451097239329375], [78.584048687080795, 25.451210764300566], [78.584173418861553, 25.450923591130898], [78.584246760957797, 25.450561194890664], [78.583806708380365, 25.450500795517289], [78.583254485538106, 25.449655204290078], [78.582797175996859, 25.448947668773428], [78.58257283546719, 25.449262608363153], [78.582460665202362, 25.449728546386311], [78.582055126552575, 25.449711289422492], [78.58214141137168, 25.449072781761124], [78.581235420771094, 25.449021010869664], [78.58042434347152, 25.448874326677188], [78.580605541591638, 25.448606843737966], [78.580139603568469, 25.448244447497732], [78.579475210461382, 25.44840838865403], [78.578905730655293, 25.448563701328414], [78.578922987619109, 25.449202208989782], [78.578974758510583, 25.450021914771263], [78.578957501546753, 25.450461967348691], [78.578957501546768, 25.450535309444927], [78.579082614534457, 25.450612965782121], [78.578887241619299, 25.451129675728815], [78.578885041961129, 25.451129627384681]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Taalpura First", "Ward Numbe": 2.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.584212612570383, 25.450729928099044], [78.584629919482722, 25.45068954355914], [78.584819746084762, 25.45026674794553], [78.585078600542062, 25.450042407415864], [78.585553167047138, 25.450094178307324], [78.585794764540623, 25.45026674794553], [78.586010476588385, 25.450534230884752], [78.586088132925582, 25.45068954355914], [78.587002752008075, 25.450033778933953], [78.58708903682718, 25.450275376427442], [78.587477318513137, 25.450068292861594], [78.587710287524715, 25.449818066886195], [78.587813829307649, 25.449697268139449], [78.588089940728779, 25.449421156718319], [78.588590392679578, 25.44970589662136], [78.588650792052945, 25.449912980187207], [78.588426451523276, 25.450318518836994], [78.588098569210686, 25.45068954355914], [78.588184854029791, 25.451060568281285], [78.588383309113723, 25.451293537292862], [78.588564507233841, 25.451681818978827], [78.588878330084199, 25.451861146321885], [78.59065171495547, 25.449150606843837], [78.590057234604345, 25.448756763611215], [78.589366956051506, 25.448342596479517], [78.589315185160046, 25.448152769877492], [78.589030445257009, 25.448213169250863], [78.588469593932828, 25.447669574890512], [78.587960513500121, 25.447056952674878], [78.587485946995059, 25.445719537978775], [78.58733447061681, 25.44479002383958], [78.586807838560176, 25.444654604167873], [78.586088941845659, 25.446279310742661], [78.586035560517857, 25.446273954127651], [78.585808516183576, 25.446764662850118], [78.585402977533789, 25.447394542029574], [78.584885268619161, 25.448386817449258], [78.584574643270386, 25.449741489109179], [78.584246760957797, 25.450561194890664], [78.584212612570383, 25.450729928099044]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Talpura Second", "Ward Numbe": 18.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.58733447061681, 25.44479002383958], [78.587485946995059, 25.445719537978775], [78.587960513500121, 25.447056952674878], [78.588469593932828, 25.447669574890512], [78.589030445257009, 25.448213169250863], [78.589315185160046, 25.448152769877492], [78.589366956051506, 25.448342596479517], [78.590057234604345, 25.448756763611215], [78.59065171495547, 25.449150606843837], [78.591558590456728, 25.447764488191517], [78.592110813298987, 25.448834419948401], [78.592939147562376, 25.449421156718305], [78.594319704668038, 25.450387546692262], [78.596735679602929, 25.451008797389807], [78.598355515154481, 25.448579044062473], [78.596219945543012, 25.447074860249174], [78.58733447061681, 25.44479002383958]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Bahar Orcha Gate Second", "Ward Numbe": 33.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.582744164154448, 25.453319895493614], [78.582688511052922, 25.453536942589547], [78.583128563630353, 25.453804425528769], [78.583706671918335, 25.454184078732823], [78.584043182712847, 25.454831214876098], [78.584604034037014, 25.455107326297231], [78.585190770806918, 25.455625035211852], [78.585812021504466, 25.45628942831895], [78.586096761407504, 25.456643196077273], [78.586381501310541, 25.457005592317508], [78.586866151958262, 25.458523129210541], [78.587071779863351, 25.457152276509969], [78.586554070948722, 25.456289428318936], [78.586346987382882, 25.455081440851487], [78.587313377356836, 25.454253106588094], [78.588878330084199, 25.451861146321885], [78.588564507233841, 25.451681818978827], [78.588383309113723, 25.451293537292862], [78.588184854029791, 25.451060568281285], [78.588098569210686, 25.45068954355914], [78.588426451523276, 25.450318518836994], [78.588650792052945, 25.449912980187207], [78.588590392679578, 25.44970589662136], [78.588089940728779, 25.449421156718319], [78.587813829307649, 25.449697268139449], [78.587710287524715, 25.449818066886195], [78.587477318513137, 25.450068292861594], [78.58708903682718, 25.450275376427442], [78.587002752008075, 25.450033778933953], [78.586088132925582, 25.45068954355914], [78.586010476588385, 25.450534230884752], [78.585794764540623, 25.45026674794553], [78.585553167047138, 25.450094178307324], [78.585078600542062, 25.450042407415864], [78.584819746084762, 25.45026674794553], [78.584629919482722, 25.45068954355914], [78.584212612570383, 25.450729928099044], [78.584173418861553, 25.450923591130898], [78.583802394139411, 25.451777810840024], [78.583431369417269, 25.452726943850163], [78.582758347828261, 25.453322309101974], [78.582744164154448, 25.453319895493614]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Daroo Bhondela", "Ward Numbe": 59.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.583855172613497, 25.460403694067519], [78.583428403376701, 25.459399996047633], [78.582979722317361, 25.459520794794379], [78.582945208389717, 25.459261940337068], [78.583083264100281, 25.459020342843576], [78.581823327341141, 25.459422926186736], [78.581969602728378, 25.459937937445957], [78.581986859692208, 25.45998107985551], [78.581160682549324, 25.460225913029731], [78.581817281067117, 25.461237404348434], [78.5817602724279, 25.461266241733988], [78.581763106368001, 25.461337090236505], [78.580934772104612, 25.461764200091068], [78.580175465696499, 25.462230138114222], [78.580796716394048, 25.463222413533909], [78.581435224055411, 25.464249202881241], [78.580779459430218, 25.464594342157657], [78.580753573984495, 25.464715140904399], [78.581949699301944, 25.466995753176338], [78.581996768438486, 25.466977675899258], [78.582351614757059, 25.46686334851394], [78.582512320232638, 25.466732842725047], [78.582621254816758, 25.466644400785469], [78.582777257550489, 25.466534223854776], [78.58254002627514, 25.466260659795942], [78.582005060396696, 25.465380554641087], [78.581444209072529, 25.464362393775666], [78.581728948975567, 25.46418982413746], [78.58254002627514, 25.463879198788685], [78.583307961165161, 25.463637601295197], [78.58420532328384, 25.463352861392156], [78.58536224026291, 25.462986232772032], [78.58504624373488, 25.462752161269794], [78.584407736073516, 25.461854799151119], [78.583803742339796, 25.460750353466597], [78.583631172701587, 25.460508755973105], [78.583855172613497, 25.460403694067519]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Banglaa Ghat", "Ward Numbe": 19.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.587046990349975, 25.459049333430968], [78.585581209613323, 25.459594136890608], [78.583631172701587, 25.460508755973105], [78.583803742339796, 25.460750353466597], [78.584407736073516, 25.461854799151119], [78.58504624373488, 25.462752161269794], [78.58536224026291, 25.462986232772032], [78.585430567715107, 25.462964579706192], [78.585767078509605, 25.4629732081881], [78.585948276629722, 25.462964579706192], [78.586172617159392, 25.462861037923265], [78.586483242508166, 25.46274886765843], [78.586785239375033, 25.462679839803148], [78.587268434362002, 25.462619440429776], [78.587673973011789, 25.462602183465957], [78.587932827469103, 25.462653954357418], [78.588096768625405, 25.46269709676697], [78.588226195854048, 25.462731610694611], [78.588407393974165, 25.462774753104163], [78.58845974302811, 25.462817286710496], [78.588541809543585, 25.462793425678182], [78.588966762277693, 25.46260845259723], [78.588970045883613, 25.462607393736302], [78.588970045883613, 25.462191309945609], [78.588245253403144, 25.461811656741556], [78.58755497485032, 25.460879780695237], [78.587382405212111, 25.459844362865997], [78.587071779863351, 25.459119570385528], [78.587046990349975, 25.459049333430968]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Laxmanganj", "Ward Numbe": 60.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.581949699301944, 25.466995753176338], [78.580753573984495, 25.464715140904399], [78.580779459430218, 25.464594342157657], [78.581435224055411, 25.464249202881241], [78.580796716394048, 25.463222413533909], [78.580175465696499, 25.462230138114222], [78.580934772104612, 25.461764200091068], [78.581763106368001, 25.461337090236505], [78.5817602724279, 25.461266241733988], [78.581300895380366, 25.461498614111502], [78.580832800236735, 25.461617255737771], [78.580658073478006, 25.461353008479254], [78.580416475984521, 25.460567816625414], [78.579286144854265, 25.461094154021943], [78.578526838446166, 25.461318494551612], [78.579053175842688, 25.462328026935122], [78.578427736867425, 25.462655562848806], [78.577853816857143, 25.462923392186941], [78.577508677580724, 25.463044190933683], [78.577336107942529, 25.463070076379417], [78.577267080087239, 25.463074390620363], [78.577405135797804, 25.463281474186211], [78.577267080087239, 25.463333245077674], [78.577178899916134, 25.463378631930446], [78.57726943891187, 25.463546775779658], [78.577312581321422, 25.463736602381687], [78.57742475158625, 25.464124884067651], [78.577536921851092, 25.464547679681257], [78.577735376935024, 25.46484967654812], [78.577933832018971, 25.465091274041608], [78.578046002283799, 25.465289729125548], [78.578014787887639, 25.465396749912376], [78.578404084283079, 25.46546229876375], [78.578593910885104, 25.46553995510094], [78.578947678643431, 25.465816066522073], [78.579051220426351, 25.466131006111802], [78.579046906185383, 25.466282004545231], [78.5789692498482, 25.466506345074901], [78.578999449534876, 25.466709114399794], [78.578995135293923, 25.466873055556089], [78.578960621366292, 25.467054253676206], [78.578961533508021, 25.467130070983931], [78.578961537324716, 25.467130293616233], [78.579071376547091, 25.467192535842248], [78.579066125133821, 25.467199975344375], [78.579320860486035, 25.46727104428421], [78.579512844208537, 25.467340072139493], [78.579603443268596, 25.46744792816337], [78.579853669244002, 25.467525584500564], [78.580222536845682, 25.467624812042533], [78.580666903664039, 25.467657168849698], [78.580869672988939, 25.467536370102952], [78.581225597867743, 25.467335757898535], [78.581255797554419, 25.467277515645641], [78.581326982530186, 25.467253787320388], [78.58144346703601, 25.467208487790359], [78.581699085812602, 25.46709200328457], [78.581949699301944, 25.466995753176338]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Sagargate", "Ward Numbe": 42.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.583984928189636, 25.454719186946857], [78.583600973014896, 25.45481827215324], [78.582945208389702, 25.454990841791446], [78.582462013402733, 25.455318724104039], [78.582392985547443, 25.456095287475971], [78.582358471619813, 25.457199733160493], [78.582738124823862, 25.457268761015779], [78.582582812149468, 25.457734699038937], [78.582841666606782, 25.457820983858038], [78.582962465353532, 25.458010810460067], [78.582720867860047, 25.458183380098273], [78.582738124823862, 25.458511262410866], [78.583100521064097, 25.458459491519406], [78.583238576774662, 25.458407720627942], [78.583376632485226, 25.458580290266148], [78.583773542653105, 25.458442234555584], [78.583924541086517, 25.458424977591765], [78.584144567375233, 25.458739917181489], [78.584131624652372, 25.45884777320537], [78.583075696953415, 25.459033585350603], [78.582945208389717, 25.459261940337068], [78.582979722317361, 25.459520794794379], [78.583428403376701, 25.459399996047633], [78.583855172613497, 25.460403694067519], [78.585581209613323, 25.459594136890608], [78.587046990349975, 25.459049333430968], [78.586864696297496, 25.458532833615624], [78.586866151958262, 25.458523129210541], [78.586381501310541, 25.457005592317508], [78.586096761407504, 25.456643196077273], [78.585812021504466, 25.45628942831895], [78.585190770806918, 25.455625035211852], [78.584604034037014, 25.455107326297231], [78.584043182712847, 25.454831214876098], [78.583984928189636, 25.454719186946857]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Chaniyapura", "Ward Numbe": 45.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.583075696953415, 25.459033585350603], [78.584131624652372, 25.45884777320537], [78.584144567375233, 25.458739917181489], [78.583924541086517, 25.458424977591765], [78.583773542653105, 25.458442234555584], [78.583376632485226, 25.458580290266148], [78.583238576774662, 25.458407720627942], [78.583100521064097, 25.458459491519406], [78.582738124823862, 25.458511262410866], [78.582720867860047, 25.458183380098273], [78.582962465353532, 25.458010810460067], [78.582841666606782, 25.457820983858038], [78.582582812149468, 25.457734699038937], [78.582738124823862, 25.457268761015779], [78.582358471619813, 25.457199733160493], [78.582392985547443, 25.456095287475971], [78.582462013402733, 25.455318724104039], [78.582945208389702, 25.454990841791446], [78.583600973014896, 25.45481827215324], [78.583984928189636, 25.454719186946857], [78.583706671918335, 25.454184078732823], [78.583128563630353, 25.453804425528769], [78.582688511052922, 25.453536942589547], [78.582744164154448, 25.453319895493614], [78.580704769133604, 25.452972855584591], [78.580722026097433, 25.453525078426853], [78.580256088074265, 25.453732161992701], [78.57989369183403, 25.453852960739447], [78.5798591779064, 25.453991016450011], [78.579755636123465, 25.454905635532509], [78.579772893087295, 25.455319802664203], [78.580187060218989, 25.455371573555666], [78.580307858965739, 25.455733969795901], [78.580152546291345, 25.456165393891418], [78.58001449058078, 25.456803901552782], [78.579824663978755, 25.457183554756838], [78.579445010774705, 25.457425152250327], [78.579356304226991, 25.457578372650925], [78.579406943601043, 25.457611483010883], [78.579601084444022, 25.457723653275718], [78.579777968323185, 25.45784013778151], [78.579989366129993, 25.457926422600611], [78.580079965190023, 25.45793936532348], [78.580373333574983, 25.45837510365995], [78.580584731381819, 25.458405303346641], [78.580895356730593, 25.45839667486473], [78.581249124488906, 25.458301761563717], [78.581365608994659, 25.458238126509624], [78.581529550150961, 25.458402067665919], [78.581555435596684, 25.458479724003112], [78.581823327341141, 25.459422926186736], [78.583083264100281, 25.459020342843576], [78.583075696953415, 25.459033585350603]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Bahar Datiya Gate Second", "Ward Numbe": 37.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.571213472737512, 25.464746318036308], [78.57092873283446, 25.464875745264965], [78.570792870267596, 25.465096521936125], [78.57072164926862, 25.465212256059466], [78.570546919720059, 25.465253511647322], [78.570494834052411, 25.465286757818159], [78.570218722631282, 25.465442070492546], [78.570164863660281, 25.465343719328104], [78.569489087057249, 25.464109692487796], [78.568104744563215, 25.465247929649557], [78.567699704475757, 25.465417731707955], [78.567690577431534, 25.46544207049255], [78.567523709337479, 25.465491512890786], [78.567276410299826, 25.465308329022935], [78.566137450687663, 25.465679353745081], [78.56615652460539, 25.465873027371352], [78.566154707651492, 25.465873494588067], [78.566102936760032, 25.466408460466511], [78.565464429098654, 25.466235890828301], [78.564152899848295, 25.465718181913683], [78.563134738982868, 25.465183216035239], [78.561033159350117, 25.464549651587131], [78.560952147130365, 25.464757121905997], [78.560676035709278, 25.46675030122729], [78.560667407227356, 25.467725319683158], [78.560839976865566, 25.468734852066667], [78.56117864478054, 25.471670693036664], [78.561198058864846, 25.471828162831528], [78.56122610143106, 25.472350185987104], [78.561050269224339, 25.472269303172013], [78.562560237610782, 25.473521157304369], [78.563764848638343, 25.474700138310066], [78.564137800004943, 25.474443734245526], [78.564517453208992, 25.473891511403266], [78.565000648195976, 25.473028663212229], [78.564206827860218, 25.472269356804119], [78.563792660728524, 25.471579078251292], [78.563067868248055, 25.471268452902521], [78.562550159333441, 25.470992341481391], [78.562757242899281, 25.470233035073282], [78.562584673261085, 25.469956923652148], [78.56272272897165, 25.469370186882244], [78.563343979669185, 25.468990533678191], [78.56303335432041, 25.468817964039985], [78.56299884039278, 25.468265741197722], [78.563758146800879, 25.468300255125364], [78.564759050702492, 25.467506434789613], [78.565621898893525, 25.467023239802632], [78.566105093880495, 25.467161295513197], [78.566484747084559, 25.466263933394522], [78.567934332045496, 25.466263933394522], [78.569452944861709, 25.466367475177446], [78.572490170494149, 25.466125877683957], [78.573542845287207, 25.465444227613041], [78.573542574022582, 25.46544338850115], [78.573466330156208, 25.465493774296228], [78.573338459986005, 25.464811995748018], [78.573219277215557, 25.464443323711443], [78.573222478718449, 25.464193606485772], [78.573209414828824, 25.464123952400779], [78.573153324161041, 25.464119637734029], [78.572775227963277, 25.464090553411122], [78.572223005121018, 25.464073296447303], [78.57209357789236, 25.464202723675957], [78.571946893699888, 25.464521977506639], [78.572012294952017, 25.464769048903538], [78.571365011852365, 25.464769048903538], [78.571213472737512, 25.464746318036308]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Nayi basti Second", "Ward Numbe": 34.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.573092324673496, 25.463173777208155], [78.573178609492601, 25.462017560632169], [78.573214086053483, 25.461876447778781], [78.573463031829561, 25.460886232043887], [78.573601087540126, 25.460558349731297], [78.573885827443149, 25.459609216721169], [78.573682539389196, 25.459575919539919], [78.571884019639953, 25.459281334408576], [78.570279122004621, 25.459126021734189], [78.568743252224579, 25.459764529395553], [78.568239911066655, 25.459654604315087], [78.568208286346149, 25.45986807117847], [78.567966688852664, 25.460765433297144], [78.568605196514028, 25.461283142211766], [78.569105648464827, 25.461369427030871], [78.569278218103037, 25.461800851126387], [78.569502558632706, 25.46268095628124], [78.569381759885957, 25.463043352521474], [78.569174676320102, 25.463353977870248], [78.569039604290211, 25.463426579086313], [78.569424902295523, 25.463992485531609], [78.570164863660281, 25.465343719328104], [78.570218722631282, 25.465442070492546], [78.570494834052411, 25.465286757818159], [78.570546919720059, 25.465253511647322], [78.57072164926862, 25.465212256059466], [78.570792870267596, 25.465096521936125], [78.57092873283446, 25.464875745264965], [78.571213472737512, 25.464746318036308], [78.571365011852365, 25.464769048903538], [78.572012294952017, 25.464769048903538], [78.571946893699888, 25.464521977506639], [78.57209357789236, 25.464202723675957], [78.572223005121018, 25.464073296447303], [78.572775227963277, 25.464090553411122], [78.573153324161041, 25.464119637734029], [78.573204177372261, 25.464096027314532], [78.573135149516972, 25.463561061436092], [78.573079196861272, 25.463515100326056], [78.573092324673496, 25.463173777208155]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Toriya narsingh Rao", "Ward Numbe": 56.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.573178609492601, 25.462017560632169], [78.573092324673496, 25.463173777208155], [78.573079196861272, 25.463515100326056], [78.573135149516972, 25.463561061436092], [78.573203447221118, 25.464090368643141], [78.573204177372261, 25.464096027314532], [78.573222478718449, 25.464193606485772], [78.573219277215557, 25.464443323711443], [78.573338459986005, 25.464811995748018], [78.573542574022582, 25.46544338850115], [78.574557726259783, 25.464640884198744], [78.575558101388822, 25.464111426289953], [78.576680343317335, 25.463635241944537], [78.577267080087239, 25.463333245077674], [78.577405135797804, 25.463281474186211], [78.577267080087239, 25.463074390620363], [78.577180795268134, 25.46294496339171], [78.577034111075662, 25.462755136789681], [78.576904683847005, 25.462444511440907], [78.576749371172625, 25.462159771537866], [78.576525030642955, 25.461806003779543], [78.576309318595193, 25.461547149322232], [78.576223033776088, 25.461404779370721], [78.576007321728326, 25.46139615088881], [78.57570532486146, 25.461555777804143], [78.575619040042369, 25.461430664816451], [78.575539342403246, 25.461190442668229], [78.575541383705172, 25.46120201004582], [78.575515498259435, 25.461055325853344], [78.575371224966275, 25.460814870364739], [78.57517035898303, 25.460455646360579], [78.574867386936603, 25.460276676071555], [78.574539940523408, 25.459987011936811], [78.574039488572609, 25.459676386588036], [78.573977087878802, 25.459658823265862], [78.573885827443149, 25.459609216721169], [78.57375048204328, 25.460060368054076], [78.573601087540126, 25.460558349731297], [78.573463031829561, 25.460886232043887], [78.573214086053483, 25.461876447778781], [78.573178609492601, 25.462017560632169]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Khushipura", "Ward Numbe": 4.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.580471800122012, 25.443153643170628], [78.580392433582759, 25.443017586246196], [78.579135551360537, 25.444313746037864], [78.580861247742604, 25.444417287820787], [78.58070476913359, 25.443835293241545], [78.580471800122012, 25.443153643170628]]], [[[78.578887241619299, 25.451129675728815], [78.579082614534457, 25.450612965782121], [78.578957501546768, 25.450535309444927], [78.578957501546753, 25.450461967348691], [78.578974758510583, 25.450021914771263], [78.578922987619109, 25.449202208989782], [78.578905730655293, 25.448563701328414], [78.579475210461382, 25.44840838865403], [78.580139603568469, 25.448244447497732], [78.580605541591638, 25.448606843737966], [78.58042434347152, 25.448874326677188], [78.581235420771094, 25.449021010869664], [78.58214141137168, 25.449072781761124], [78.582055126552575, 25.449711289422492], [78.582460665202362, 25.449728546386311], [78.58257283546719, 25.449262608363153], [78.582797175996859, 25.448947668773428], [78.581891185396273, 25.446721520440562], [78.581390733445488, 25.446445409019432], [78.580803996675584, 25.445772387430427], [78.580747911543156, 25.445578246587441], [78.58074919867488, 25.445525474186816], [78.580723192032039, 25.445521733505313], [78.580861247742604, 25.444417287820787], [78.579157488555623, 25.44431506226957], [78.579056729088691, 25.444535278836504], [78.578288794198656, 25.446900561440184], [78.577253376369427, 25.448143062835275], [78.577425946007622, 25.449454592085647], [78.577460459935267, 25.45028292634904], [78.577598515645832, 25.450507266878709], [78.577888635355364, 25.450797386588242], [78.578185252415736, 25.450876134480374], [78.578517448969279, 25.451053018359538], [78.578639951535806, 25.451124240781922], [78.578887241619299, 25.451129675728815]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Nandanpura Third", "Ward Numbe": 41.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.528345044489654, 25.446666424918064], [78.529090545326696, 25.44652146642197], [78.529318337249137, 25.445983049150762], [78.529276920535963, 25.44554817366248], [78.528427877915988, 25.445175423243956], [78.527785918861852, 25.445071881461033], [78.527309626660411, 25.444844089538599], [78.526833334458956, 25.444533464189824], [78.526377750614088, 25.444719839399088], [78.525797916629713, 25.444781964468845], [78.525123411722703, 25.444894381953347], [78.525123411722703, 25.441943340273102], [78.526987163815335, 25.439182226061792], [78.525468550999122, 25.438560975364247], [78.521565241493974, 25.438333129513595], [78.521052925380488, 25.439115085686677], [78.520397192472913, 25.441126866816706], [78.520245083761637, 25.441321819935261], [78.520051224187938, 25.441753946620473], [78.519644325708612, 25.442266638704407], [78.519079160143505, 25.442877103799564], [78.518583022433631, 25.443550125388565], [78.517530347640559, 25.444982453385677], [78.516762412750552, 25.446086899070202], [78.516758098509598, 25.446660693117241], [78.51685085469002, 25.447126631140417], [78.517165794279776, 25.44748039889874], [78.517513090676658, 25.44833677572834], [78.517636046543856, 25.448558959137529], [78.517981185820275, 25.448731528775738], [78.519003660926657, 25.449037839883555], [78.520093006767937, 25.449393764762348], [78.521318251199204, 25.450056000748965], [78.521774749152002, 25.450417137464804], [78.522019315354285, 25.450806678675168], [78.522168156667249, 25.451671683986685], [78.522396811438028, 25.453964703054357], [78.515737237031615, 25.454433910463568], [78.515814893368812, 25.455693668822473], [78.516076448438625, 25.457366482047497], [78.518006670202425, 25.457017587022804], [78.522058143523722, 25.457144298638539], [78.525233424866727, 25.456246936519864], [78.533861906777062, 25.456246936519864], [78.534393439323267, 25.456146792706811], [78.534235088620022, 25.455196688487387], [78.534649255751717, 25.450847933604575], [78.534336153880574, 25.450339143063964], [78.53375890006167, 25.450269589381552], [78.531619036547895, 25.449510282973442], [78.529755284455263, 25.448233267650711], [78.529410145178858, 25.448750976565332], [78.529134033757728, 25.448958060131179], [78.528821336691109, 25.448757968933133], [78.528365752846241, 25.448302385088269], [78.528200085993575, 25.447722551103894], [78.528117632549893, 25.446666424918064], [78.528345044489654, 25.446666424918064]], [[78.528117632549893, 25.446666424918064], [78.528093728303332, 25.446666424918064], [78.527684448796791, 25.447094308038544], [78.52811582870838, 25.446643319949146], [78.528117632549893, 25.446666424918064]], [[78.525123411722703, 25.445049593760825], [78.525123411722703, 25.445001901175306], [78.525123983198014, 25.445049522326411], [78.525123411722703, 25.445049593760825]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Schoolpura", "Ward Numbe": 12.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.541734041507851, 25.429601701581682], [78.541168694304844, 25.429732166320836], [78.540713110459976, 25.430249875235454], [78.540247172436821, 25.430239521057164], [78.539574150847812, 25.429897833173513], [78.539263525499038, 25.429732166320836], [78.538911483437104, 25.429711457964249], [78.538352357809302, 25.430425896266424], [78.538000315747368, 25.430705459080322], [78.537102090780493, 25.431241287806952], [78.537257403454873, 25.431707225830113], [78.537909716687295, 25.432877247977153], [78.537795820726089, 25.433218935860804], [78.538530967384844, 25.43311539407788], [78.538655217524351, 25.434212936976873], [78.538948269753746, 25.434015031334074], [78.538947723061099, 25.434013619044748], [78.538953438643105, 25.434011540651291], [78.539175514983526, 25.433930785618408], [78.539900307463995, 25.433744410409144], [78.540459433091783, 25.433433785060373], [78.540935725293238, 25.433454493416956], [78.540997850362999, 25.43368228533939], [78.540977142006412, 25.434034327401331], [78.540915016936651, 25.434427786176446], [78.54166284865579, 25.434736673190873], [78.541731082279284, 25.433053577144864], [78.541938165845124, 25.431949131460343], [78.541734041507851, 25.429601701581682]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Ishaee Tola Second", "Ward Numbe": 26.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.538953438643105, 25.434011540651291], [78.538948269753746, 25.434015031334074], [78.539196223340113, 25.434655578098877], [78.53927905676646, 25.435090453587158], [78.539237640053287, 25.435442495649102], [78.538989139774273, 25.435628870858363], [78.539755348967915, 25.440122584237269], [78.539817474037662, 25.440246834376779], [78.539610390471822, 25.440702418221644], [78.538782056208419, 25.440536751368967], [78.53811938879771, 25.440536751368967], [78.537870888518697, 25.44059887643872], [78.537601679883082, 25.44175854440747], [78.536421303557759, 25.441613585911377], [78.535323760658756, 25.44167571098113], [78.533998425837325, 25.442027753043075], [78.533667092131978, 25.442131294825998], [78.532797341155415, 25.442566170314279], [78.532528132519801, 25.442131294825998], [78.531844756752506, 25.441820669477224], [78.531244214411544, 25.442131294825998], [78.531513423047144, 25.443083879228901], [78.530498713574488, 25.443083879228901], [78.530519421931075, 25.443643004856689], [78.530105254799381, 25.4437672549962], [78.529504712458419, 25.443850088422536], [78.529214795466231, 25.444388505693745], [78.529276920535963, 25.44554817366248], [78.529318337249137, 25.445983049150762], [78.529090545326696, 25.44652146642197], [78.528345044489654, 25.446666424918064], [78.528117632549893, 25.446666424918064], [78.528200085993575, 25.447722551103894], [78.528365752846241, 25.448302385088269], [78.528821336691109, 25.448757968933133], [78.529134033757728, 25.448958060131179], [78.529410145178858, 25.448750976565332], [78.529755284455263, 25.448233267650711], [78.530376535152811, 25.447612016953165], [78.531437522673315, 25.447280979412017], [78.532198766889266, 25.447137686383133], [78.533424011320534, 25.447137686383133], [78.534131546837173, 25.446999630672568], [78.534977138064392, 25.446861574962], [78.535512103942835, 25.447172200310774], [78.53554661787048, 25.446861574962], [78.536668320518814, 25.446861574962], [78.537341342107823, 25.446827061034359], [78.539653775259794, 25.446913345853464], [78.540013928780326, 25.446921920937285], [78.540014549446582, 25.446404029485716], [78.540359688723001, 25.446360887076164], [78.540428716578276, 25.445782778788171], [78.541351964142692, 25.445791407270082], [78.541751859164506, 25.445810449890168], [78.541931694484049, 25.442599104898289], [78.54152399871343, 25.438161638435787], [78.54166284865579, 25.434736673190873], [78.540915016936651, 25.434427786176446], [78.540977142006412, 25.434034327401331], [78.540997850362999, 25.43368228533939], [78.540935725293238, 25.433454493416956], [78.540459433091783, 25.433433785060373], [78.539900307463995, 25.433744410409144], [78.539175514983526, 25.433930785618408], [78.538953438643105, 25.434011540651291]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Ishaee Tola First", "Ward Numbe": 5.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.538948269753746, 25.434015031334074], [78.538655217524351, 25.434212936976873], [78.538530967384844, 25.43311539407788], [78.537795820726089, 25.433218935860804], [78.537909716687295, 25.432877247977153], [78.537257403454873, 25.431707225830113], [78.537102090780493, 25.431241287806952], [78.536335881586851, 25.431448371372802], [78.535642151641269, 25.4317279341867], [78.535362588827368, 25.432369893240828], [78.535404005540542, 25.43302220647325], [78.534865588269327, 25.433187873325927], [78.534275400106665, 25.433187873325927], [78.533467774199849, 25.43299114393837], [78.531873230742818, 25.433022206473247], [78.529802395084346, 25.433249998395681], [78.52906207133644, 25.433363894356898], [78.528254445429624, 25.433674519705669], [78.527958027508987, 25.433859780906079], [78.527998179516871, 25.433904900172674], [78.525927343858399, 25.434526150870219], [78.524871217672569, 25.435313068420445], [78.522903923797017, 25.435665110482386], [78.521496422255737, 25.436042732847113], [78.521716239927414, 25.437355953937246], [78.521565241493974, 25.438333129513595], [78.525468550999122, 25.438560975364247], [78.526987163815335, 25.439182226061792], [78.525123411722703, 25.441943340273102], [78.525123411722703, 25.444894381953347], [78.525797916629713, 25.444781964468845], [78.526377750614088, 25.444719839399088], [78.526833334458956, 25.444533464189824], [78.527309626660411, 25.444844089538599], [78.527785918861852, 25.445071881461033], [78.528427877915988, 25.445175423243956], [78.529276920535963, 25.44554817366248], [78.529214795466231, 25.444388505693745], [78.529504712458419, 25.443850088422536], [78.530105254799381, 25.4437672549962], [78.530519421931075, 25.443643004856689], [78.530498713574488, 25.443083879228901], [78.531513423047144, 25.443083879228901], [78.531244214411544, 25.442131294825998], [78.531844756752506, 25.441820669477224], [78.532528132519801, 25.442131294825998], [78.532797341155415, 25.442566170314279], [78.533667092131978, 25.442131294825998], [78.533998425837325, 25.442027753043075], [78.535323760658756, 25.44167571098113], [78.536421303557759, 25.441613585911377], [78.537601679883082, 25.44175854440747], [78.537870888518697, 25.44059887643872], [78.53811938879771, 25.440536751368967], [78.538782056208419, 25.440536751368967], [78.539610390471822, 25.440702418221644], [78.539817474037662, 25.440246834376779], [78.539755348967915, 25.440122584237269], [78.538989139774273, 25.435628870858363], [78.539237640053287, 25.435442495649102], [78.53927905676646, 25.435090453587158], [78.539196223340113, 25.434655578098877], [78.538948269753746, 25.434015031334074]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Nainagargh", "Ward Numbe": 6.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.538042878859457, 25.430671658961902], [78.537728787813606, 25.430420386125224], [78.53713859965093, 25.429737010357922], [78.535937514969021, 25.428960446985993], [78.53693151608509, 25.42796644586992], [78.537242141433865, 25.42684819461434], [78.537345683216785, 25.425253651157309], [78.535316264271472, 25.425150109374385], [78.535005638922698, 25.424798067312445], [78.534239429729055, 25.425150109374385], [78.533411095465667, 25.425315776227063], [78.532437802706184, 25.42541931800999], [78.532106469000823, 25.425253651157309], [78.53086396760574, 25.426371902412889], [78.52970429963699, 25.425978443637778], [78.528938090443347, 25.425584984862663], [78.526660171219021, 25.427593695451392], [78.526722296288767, 25.428111404366014], [78.52639096258342, 25.428132112722597], [78.526349545870247, 25.427862904086993], [78.526011168800807, 25.428082849182129], [78.525828790118467, 25.428368311467537], [78.525759762263192, 25.429472757152062], [78.525658135222798, 25.430301646126917], [78.525989468928145, 25.431647689304931], [78.526141724500619, 25.431818780618325], [78.527958027508987, 25.433859780906079], [78.528254445429624, 25.433674519705669], [78.52906207133644, 25.433363894356898], [78.529802395084346, 25.433249998395681], [78.531873230742818, 25.433022206473247], [78.533467774199849, 25.43299114393837], [78.534275400106665, 25.433187873325927], [78.534865588269327, 25.433187873325927], [78.535404005540542, 25.43302220647325], [78.535362588827368, 25.432369893240828], [78.535642151641269, 25.4317279341867], [78.536335881586851, 25.431448371372802], [78.537102090780493, 25.431241287806952], [78.538000315747368, 25.430705459080322], [78.538042878859457, 25.430671658961902]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Naina Ghat South First", "Ward Numbe": 10.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.534038933092347, 25.419439826955518], [78.534454278928678, 25.419745228305757], [78.534971987843292, 25.420283645576962], [78.535179071409146, 25.420594270925733], [78.535655363610587, 25.420780646134997], [78.536732198153004, 25.421608980398389], [78.537456990633473, 25.422561564801292], [78.537809032695421, 25.423058565359327], [78.538140366400768, 25.423638399343702], [78.538388866679796, 25.424073274831983], [78.53890657559441, 25.424570275390021], [78.539196492586598, 25.424673817172945], [78.539527826291959, 25.424528858676851], [78.538326741610035, 25.423576274273948], [78.538761617098316, 25.42301714864616], [78.539734909857799, 25.423824774552966], [78.540749619330455, 25.424446025250511], [78.541101661392403, 25.424715233886115], [78.541503152319905, 25.424992124180942], [78.541731082279284, 25.420490507483407], [78.544310998370406, 25.418704411727976], [78.542136620929, 25.415943297516666], [78.539613445495419, 25.41659443956404], [78.5389195183173, 25.417591559220931], [78.536848682658828, 25.416970308523386], [78.536103181821773, 25.416970308523386], [78.53523343084521, 25.417840059499948], [78.534115179589634, 25.419289644460886], [78.534038933092347, 25.419439826955518]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Gadiya Gaon", "Ward Numbe": 15.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.532994339789468, 25.4241871707932], [78.532497339231398, 25.42320352385542], [78.532279901487257, 25.422654752405922], [78.53198998449507, 25.422261293630811], [78.531886442712135, 25.421712522181313], [78.53215565134775, 25.421101625662061], [78.532828672936745, 25.420594270925733], [78.533491340347467, 25.420159395437452], [78.533756776317063, 25.42007967377214], [78.533773491705958, 25.419962666049891], [78.534115179589634, 25.419289644460886], [78.53523343084521, 25.417840059499948], [78.536103181821773, 25.416970308523386], [78.536848682658828, 25.416970308523386], [78.5389195183173, 25.417591559220931], [78.539613445495419, 25.41659443956404], [78.538926825658351, 25.416771631780058], [78.537433302395669, 25.414244130873996], [78.535337377183637, 25.410697180515175], [78.533370083308085, 25.405140438164914], [78.531609872998374, 25.40303508857879], [78.531188448460142, 25.402264483708894], [78.530485961205002, 25.402623326681613], [78.527919864235187, 25.403934134611852], [78.526525392095209, 25.404270346284115], [78.520781128200568, 25.401270564028028], [78.515051816212093, 25.400062576560575], [78.513179435637866, 25.402051441640992], [78.511816135496062, 25.402275782170669], [78.509637102162799, 25.40507008540429], [78.51052432376153, 25.408164256006962], [78.509822956174446, 25.409260538277], [78.509684900463725, 25.412953528534626], [78.508787538345004, 25.415783670601211], [78.506630417867399, 25.417077942887765], [78.507234411601132, 25.418303187319033], [78.507286182492606, 25.419718258352329], [78.507182640709672, 25.42096075974742], [78.506664931795058, 25.422013434540482], [78.507251668564962, 25.42296256755062], [78.508088631310301, 25.423161022634538], [78.508425142104798, 25.423557932802414], [78.508571826297285, 25.424015242343664], [78.508364742731416, 25.424705520896488], [78.508019603455011, 25.42575819568955], [78.507639950250976, 25.426526130579575], [78.507372467311711, 25.427194837927615], [78.507575236636626, 25.428454596286539], [78.508466203527504, 25.428164120980806], [78.508637618471795, 25.428202213190648], [78.509122970579213, 25.428119164052262], [78.509726964312947, 25.427951987215252], [78.510279187155234, 25.427921787528557], [78.5108508240818, 25.42793904449238], [78.511135563984851, 25.428090042925813], [78.512071754272085, 25.428558138069448], [78.513532124835422, 25.428799735562933], [78.514886693922676, 25.429313898599791], [78.516332067215302, 25.431060397823444], [78.517602611176656, 25.431840196876081], [78.519254405338955, 25.432385487960989], [78.520431674682982, 25.433106426596424], [78.520993604567423, 25.433652178077242], [78.521159433800761, 25.434019289690394], [78.521306387036645, 25.43434461375054], [78.521371100650981, 25.434493455063492], [78.521466013951994, 25.435861069446286], [78.521496422255737, 25.436042732847113], [78.522903923797017, 25.435665110482386], [78.524871217672569, 25.435313068420445], [78.525927343858399, 25.434526150870219], [78.527998179516871, 25.433904900172674], [78.526141724500619, 25.431818780618325], [78.525989468928145, 25.431647689304931], [78.525658135222798, 25.430301646126917], [78.525759762263192, 25.429472757152062], [78.525828790118467, 25.428368311467537], [78.526011168800821, 25.428082849182125], [78.526349545870247, 25.427862904086993], [78.52639096258342, 25.428132112722597], [78.526722296288767, 25.428111404366014], [78.526660171219021, 25.427593695451392], [78.528938090443347, 25.425584984862663], [78.52970429963699, 25.425978443637778], [78.53086396760574, 25.426371902412889], [78.532054074363685, 25.425300806330736], [78.532106469000823, 25.425253651157309], [78.532110613491525, 25.425255723402664], [78.532424859983379, 25.425005150878302], [78.532663006084107, 25.424715233886115], [78.532952923076294, 25.424446025250511], [78.532994339789468, 25.4241871707932]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Heerapura", "Ward Numbe": 28.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.538888097417754, 25.424552536340432], [78.538533825175875, 25.425388255475116], [78.538482054284415, 25.425812776785108], [78.537726199269073, 25.425740297537061], [78.537488053168346, 25.427220945032875], [78.537472521900924, 25.427433205687873], [78.537653720021041, 25.42780077901725], [78.537840095230308, 25.428049279296271], [78.538171428935641, 25.428618759102349], [78.538751262920016, 25.42879478013332], [78.53901011737733, 25.428825842668196], [78.53880303381149, 25.429509218435498], [78.538891575193645, 25.42973689627533], [78.538911483437104, 25.429711457964249], [78.539263525499038, 25.429732166320836], [78.539574150847812, 25.429897833173513], [78.540247172436821, 25.430239521057164], [78.540713110459976, 25.430249875235454], [78.541168694304844, 25.429732166320836], [78.541734041507851, 25.429601701581682], [78.541662054423995, 25.428773850117334], [78.54145497085814, 25.425943708050742], [78.541503152319905, 25.424992124180942], [78.541101661392403, 25.424715233886115], [78.540749619330455, 25.424446025250511], [78.539734909857799, 25.423824774552966], [78.538761617098316, 25.42301714864616], [78.538326741610035, 25.423576274273948], [78.539527826291959, 25.424528858676851], [78.539196492586598, 25.424673817172945], [78.53890657559441, 25.424570275390021], [78.538888097417754, 25.424552536340432]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Nainagarh South Second", "Ward Numbe": 29.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.53880303381149, 25.429509218435498], [78.53901011737733, 25.428825842668196], [78.538751262920016, 25.42879478013332], [78.538171428935641, 25.428618759102349], [78.537840095230308, 25.428049279296271], [78.537653720021041, 25.42780077901725], [78.537472521900924, 25.427433205687873], [78.537488053168346, 25.427220945032875], [78.537726199269073, 25.425740297537061], [78.538482054284415, 25.425812776785108], [78.538533825175875, 25.425388255475116], [78.538888097417754, 25.424552536340432], [78.538388866679796, 25.424073274831983], [78.538140366400768, 25.423638399343702], [78.537809032695421, 25.423058565359327], [78.537456990633473, 25.422561564801292], [78.536732198153004, 25.421608980398389], [78.535655363610587, 25.420780646134997], [78.535179071409146, 25.420594270925733], [78.534971987843292, 25.420283645576962], [78.534454278928678, 25.419745228305757], [78.534038933092347, 25.419439826955518], [78.533773491705958, 25.419962666049891], [78.533756776317063, 25.42007967377214], [78.533491340347467, 25.420159395437452], [78.532828672936745, 25.420594270925733], [78.53215565134775, 25.421101625662061], [78.531886442712135, 25.421712522181313], [78.53198998449507, 25.422261293630811], [78.532279901487257, 25.422654752405922], [78.532497339231398, 25.42320352385542], [78.532994339789468, 25.4241871707932], [78.532952923076294, 25.424446025250511], [78.532663006084107, 25.424715233886115], [78.532424859983379, 25.425005150878302], [78.532110613491525, 25.425255723402664], [78.532437802706184, 25.42541931800999], [78.533411095465667, 25.425315776227063], [78.534239429729055, 25.425150109374385], [78.535005638922698, 25.424798067312445], [78.535316264271472, 25.425150109374385], [78.537345683216785, 25.425253651157309], [78.537242141433865, 25.42684819461434], [78.53693151608509, 25.42796644586992], [78.535937514969021, 25.428960446985993], [78.53713859965093, 25.429737010357922], [78.537728787813606, 25.430420386125224], [78.538042878859457, 25.430671658961902], [78.538352357809302, 25.430425896266424], [78.538891575193645, 25.42973689627533], [78.53880303381149, 25.429509218435498]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "kocha Bhanwar", "Ward Numbe": 13.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.639468013094515, 25.451218119737639], [78.637222491580843, 25.451043961927951], [78.632942764553306, 25.451872296191343], [78.630526789618415, 25.453390909007563], [78.630802901039544, 25.452769658310018], [78.629974566776156, 25.451941324046626], [78.628041786828234, 25.450836878362104], [78.627282480420121, 25.449387293401166], [78.626523174012007, 25.448558959137774], [78.625556784038054, 25.446695207045138], [78.624659421919375, 25.446833262755703], [78.623969143366551, 25.444900482807789], [78.622864697682033, 25.444417287820809], [78.622312474839774, 25.443381869991565], [78.621415112721095, 25.444279232110244], [78.619827472049593, 25.445107566373636], [78.618170803522801, 25.445728817071181], [78.617894692101657, 25.446557151334581], [78.621553168431646, 25.45187229619135], [78.6217602519975, 25.452390005105968], [78.622795669826729, 25.454288271126245], [78.623969143366537, 25.455461744666053], [78.624797477629926, 25.457532580324536], [78.624141713004747, 25.457705149962742], [78.623451434451894, 25.457808691745665], [78.622485044477926, 25.458153831022077], [78.620655806312939, 25.458602512081416], [78.620345180964165, 25.459085707068393], [78.621380598793408, 25.460052097042354], [78.622174419129152, 25.460431750246407], [78.623037267320186, 25.461122028799235], [78.623658518017734, 25.461708765569139], [78.624107199077073, 25.462260988411401], [78.624866505485187, 25.462813211253664], [78.625832895459141, 25.463572517661774], [78.626695743650174, 25.464055712648751], [78.627316994347723, 25.464676963346296], [78.627386022202998, 25.465401755826765], [78.628732065381044, 25.467058424353549], [78.626109006880299, 25.467127452208835], [78.622381502695035, 25.468508009314487], [78.616401964731125, 25.470423532298543], [78.616988701501029, 25.473253674365136], [78.617299326849803, 25.47384041113504], [78.617748007909142, 25.474530689687867], [78.618231202896112, 25.475289996095977], [78.618748911810741, 25.475704163227675], [78.617333840777462, 25.480225487748694], [78.619335648580659, 25.478154652090211], [78.619749815712353, 25.480156459893411], [78.620163982844062, 25.482020211986043], [78.620371066409746, 25.48456561414957], [78.625660644479765, 25.483079896006402], [78.633365560166752, 25.4809157663015], [78.643012202942472, 25.4778267697776], [78.649808178554864, 25.475670672500527], [78.647499013535864, 25.464754619683422], [78.645773317153783, 25.461441282629853], [78.639468013094515, 25.451218119737639]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Civil Lines South part 2", "Ward Numbe": 51.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.560588629494376, 25.443248128521944], [78.560711585361688, 25.444912346970401], [78.561919572829126, 25.445671653378511], [78.563541727428273, 25.444670749476909], [78.564059436342902, 25.444636235549268], [78.564956798461594, 25.446292904076053], [78.565405479520933, 25.447086724411804], [78.565716104869708, 25.447552662434962], [78.566561696096926, 25.447121238339445], [78.567545343034695, 25.447000439592703], [78.569098469778567, 25.446965925665058], [78.569529893874076, 25.447017696556522], [78.569633435656996, 25.448519052408923], [78.570789652232989, 25.447397349760578], [78.572808717000015, 25.445361028029737], [78.574275558924768, 25.444411895019599], [78.57591497048773, 25.443635331647666], [78.57581142870481, 25.442824254348096], [78.575414518536931, 25.441788836518853], [78.575155664079617, 25.440805189581074], [78.574948580513777, 25.440183938883532], [78.574954660391612, 25.440001542548384], [78.572612419036318, 25.440620755780245], [78.570647282281413, 25.441193471267042], [78.569723684606998, 25.441675943877915], [78.569182597477095, 25.442273110066083], [78.569022970561605, 25.440758811490809], [78.568850400923409, 25.439792421516849], [78.566054772784454, 25.439964991155058], [78.563535256066629, 25.441552631826561], [78.560588629494376, 25.443248128521944]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Pichaur", "Ward Numbe": 32.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.604158148900524, 25.452666116527077], [78.605184938247916, 25.4530198842854], [78.604977854682062, 25.45426238568049], [78.604149520418673, 25.455297803509733], [78.60339021401056, 25.456609332760102], [78.603252158299995, 25.458127945576326], [78.602976046878865, 25.460612948366503], [78.602354796181316, 25.461027115498201], [78.601871601194333, 25.461993505472158], [78.599869793391136, 25.46206253332744], [78.599593681970006, 25.462752811880268], [78.599869793391136, 25.464409480407053], [78.599869793391136, 25.466066148933837], [78.599869793391136, 25.467791845315908], [78.601388406207363, 25.4686201795793], [78.602216740470752, 25.469586569553258], [78.602803477240428, 25.470665129792028], [78.60483979897127, 25.470975755140802], [78.606151328221642, 25.471562491910706], [78.611017792019069, 25.471010269068447], [78.616401964731125, 25.470423532298543], [78.622381502695035, 25.468508009314487], [78.626109006880299, 25.467127452208835], [78.628732065381044, 25.467058424353549], [78.627386022202998, 25.465401755826765], [78.627316994347723, 25.464676963346296], [78.626695743650174, 25.464055712648751], [78.625832895459141, 25.463572517661774], [78.624866505485187, 25.462813211253664], [78.624107199077073, 25.462260988411401], [78.623658518017734, 25.461708765569139], [78.623037267320186, 25.461122028799235], [78.622174419129152, 25.460431750246407], [78.621380598793408, 25.460052097042354], [78.620345180964165, 25.459085707068393], [78.620655806312939, 25.458602512081416], [78.622485044477926, 25.458153831022077], [78.623451434451894, 25.457808691745665], [78.624141713004747, 25.457705149962742], [78.624797477629926, 25.457532580324536], [78.623969143366537, 25.455461744666053], [78.622795669826729, 25.454288271126245], [78.6217602519975, 25.452390005105968], [78.621553168431646, 25.45187229619135], [78.621277057010516, 25.451043961927958], [78.618544342806331, 25.446367984289662], [78.610991906573517, 25.450388197302743], [78.608575931638626, 25.450664308723876], [78.607057318822399, 25.451078475855571], [78.604158148900524, 25.452666116527077]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Kachiyana Puliya No9", "Ward Numbe": 7.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.568125608442941, 25.418186702813351], [78.567407287324158, 25.417948341000592], [78.566906835373359, 25.418025997337782], [78.565733361833551, 25.417292576375406], [78.565327823183793, 25.41692155165326], [78.563084417887111, 25.417163149146752], [78.562394139334273, 25.417646344133729], [78.561393235432675, 25.417818913771939], [78.560530387241641, 25.418025997337786], [78.559253371918913, 25.417404746640241], [78.5584940655108, 25.416852523797978], [78.557113508405152, 25.416748982015054], [78.55524975631252, 25.416714468087413], [78.554788001807438, 25.416288735587614], [78.554320037386404, 25.417358368549959], [78.551489895319818, 25.418083161030427], [78.548590725397943, 25.418324758523916], [78.546209264390683, 25.417979619247504], [78.54520276748265, 25.418363918066937], [78.545525457199531, 25.418699018926787], [78.546767958594629, 25.420252145670649], [78.548217543555566, 25.421874300269792], [78.549391017095374, 25.423185829520165], [78.551254769188006, 25.42580888802091], [78.551599908464425, 25.42580888802091], [78.552807895931863, 25.425394720889212], [78.553394632701767, 25.425187637323365], [78.553877827688751, 25.425153123395724], [78.554291994820446, 25.425291179106289], [78.555638037998463, 25.425256665178647], [78.556431858334207, 25.425015067685159], [78.558088526860999, 25.424911525902235], [78.558675263630903, 25.425256665178647], [78.559538111821936, 25.426257569080246], [78.560190025451277, 25.427348215363025], [78.568160122370585, 25.425124002269264], [78.570748666943686, 25.424157612295307], [78.569161026272184, 25.419843371340136], [78.568125608442941, 25.418186702813351]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Hansari Gird First", "Ward Numbe": 1.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.562223726816285, 25.407452871316885], [78.563835095813289, 25.409354373017887], [78.565836903616486, 25.412805765782021], [78.566458154314034, 25.415152712861637], [78.568125608442941, 25.418186702813351], [78.571680542990009, 25.416806145707696], [78.575615130741127, 25.415736213950815], [78.578721384228842, 25.414321142917519], [78.580343538827989, 25.411939681910262], [78.578203675314228, 25.409558220903008], [78.5740965179249, 25.407970580231506], [78.57105929229246, 25.406106828138871], [78.570783180871345, 25.404622729250292], [78.567469843817776, 25.403552797493411], [78.562844977513819, 25.403311199999919], [78.561326364697607, 25.403759881059258], [78.560774141855347, 25.404829812816143], [78.562223726816285, 25.407452871316885]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Hansari Gird Second", "Ward Numbe": 9.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.554788001807438, 25.416288735587614], [78.55524975631252, 25.416714468087413], [78.557113508405152, 25.416748982015054], [78.5584940655108, 25.416852523797978], [78.559253371918913, 25.417404746640241], [78.560530387241641, 25.418025997337786], [78.561393235432675, 25.417818913771939], [78.562394139334273, 25.417646344133729], [78.563084417887111, 25.417163149146752], [78.565327823183793, 25.41692155165326], [78.565733361833551, 25.417292576375406], [78.566906835373359, 25.418025997337782], [78.567407287324158, 25.417948341000592], [78.568125608442941, 25.418186702813351], [78.566458154314034, 25.415152712861637], [78.565836903616486, 25.412805765782021], [78.563835095813289, 25.409354373017887], [78.562223726816285, 25.407452871316885], [78.559738724026104, 25.408350233435559], [78.556080247696116, 25.408936970205463], [78.554320037386404, 25.409213081626596], [78.553146563846596, 25.410524610876966], [78.552456285293772, 25.412560932607807], [78.552801424570191, 25.415045935397988], [78.554803232373388, 25.416253922865433], [78.554788001807438, 25.416288735587614]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Bhatta Gaon", "Ward Numbe": 3.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.603122731071181, 25.42374344516363], [78.603916551406925, 25.421845179143354], [78.604917455308538, 25.420188510616565], [78.606367040269475, 25.416875173562993], [78.605435164223152, 25.413941489713473], [78.601983771459018, 25.415183991108563], [78.599360712958273, 25.415736213950826], [78.599047930489419, 25.418819817673533], [78.59856473550245, 25.423030516845781], [78.598633763357725, 25.426965104596896], [78.601697086793891, 25.428744673106607], [78.60146606254439, 25.428609908961061], [78.602322439374461, 25.425273113222321], [78.603122731071181, 25.42374344516363]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Simraha", "Ward Numbe": 24.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.593885193778817, 25.410303501513564], [78.595247084207998, 25.411018861106434], [78.59731791986647, 25.411985251080392], [78.598974588393261, 25.413710947462462], [78.601175208893181, 25.415354214806634], [78.599360712958273, 25.415736213950826], [78.601983771459018, 25.415183991108563], [78.605435164223152, 25.413941489713473], [78.606367040269475, 25.416875173562993], [78.604917455308538, 25.420188510616565], [78.603916551406925, 25.421845179143354], [78.603122731071181, 25.42374344516363], [78.602322439374461, 25.425273113222321], [78.60146606254439, 25.428609908961061], [78.602294396807778, 25.429093103948041], [78.603605926058151, 25.429300187513888], [78.606021900993056, 25.429576298935018], [78.610301628020579, 25.428955048237476], [78.613338853653019, 25.428264769684649], [78.618930109930915, 25.436548112318579], [78.617307955331768, 25.437445474437254], [78.619413304917884, 25.440206588648564], [78.622312474839774, 25.443381869991565], [78.622864697682033, 25.444417287820809], [78.623969143366551, 25.444900482807789], [78.624659421919375, 25.446833262755703], [78.625556784038054, 25.446695207045138], [78.626523174012007, 25.448558959137774], [78.627282480420121, 25.449387293401166], [78.628041786828234, 25.450836878362104], [78.629974566776156, 25.451941324046626], [78.630802901039544, 25.452769658310018], [78.630526789618415, 25.453390909007563], [78.632942764553306, 25.451872296191343], [78.637222491580843, 25.451043961927951], [78.639468013094515, 25.451218119737639], [78.63866344805966, 25.449913630797635], [78.636937751677593, 25.445288764493693], [78.638525392349123, 25.439559452505229], [78.640596228007595, 25.433415973385063], [78.641424562270984, 25.427341522120184], [78.642598035810792, 25.424097212921893], [78.642943175087211, 25.421819293697563], [78.643564425784746, 25.420369708736626], [78.643564425784746, 25.418091789512296], [78.644530815758714, 25.415882898143249], [78.644530815758714, 25.414364285327029], [78.642874147231922, 25.411534143260436], [78.640458172297045, 25.409739419023083], [78.639491782323063, 25.405597747706121], [78.637282890954069, 25.40262954992895], [78.634245665321629, 25.400696769981032], [78.631691634676159, 25.399868435717639], [78.627618991214476, 25.400765797836314], [78.625410099845439, 25.402767605639514], [78.62506496056902, 25.405321636284974], [78.624443709871471, 25.409463307601939], [78.622925097055258, 25.413950118195316], [78.620440094265078, 25.414847480313991], [78.618024119330158, 25.414571368892865], [78.613951475868475, 25.414364285327014], [78.611984181992909, 25.415572272794464], [78.610448312212867, 25.415917412070872], [78.60892969939664, 25.415727585468844], [78.607709023104221, 25.414919085586845], [78.606738064991418, 25.413829319448567], [78.606254870004435, 25.412535047162017], [78.605426535741046, 25.411465115405132], [78.602943479025768, 25.410393085837313], [78.602113442278096, 25.409500030604878], [78.601405663170823, 25.408738515121467], [78.60185434423019, 25.40440701720248], [78.599360712958273, 25.403656339276345], [78.594528763088491, 25.402620921447102], [78.593631400969812, 25.40482981281615], [78.593010150272264, 25.40883342842255], [78.593885193778817, 25.410303501513564]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Nandanpura First", "Ward Numbe": 35.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.539343149910991, 25.450140398087918], [78.539084295453677, 25.451607240012677], [78.539084295453677, 25.45319488068418], [78.538859954924007, 25.454299326368705], [78.538645364110508, 25.455343668327767], [78.541650453212085, 25.454479387772128], [78.541638326099118, 25.453885159237007], [78.541638326099118, 25.453074081937434], [78.541810895737328, 25.452728942661022], [78.542552945181612, 25.452866998371587], [78.543208709806805, 25.451866094469988], [78.542880827494216, 25.451503698229754], [78.541879923592617, 25.45140015644683], [78.541931694484049, 25.450157655051747], [78.541690096990564, 25.44691334585346], [78.541728901487815, 25.446220408402603], [78.541751859164506, 25.445810449890168], [78.541351964142692, 25.445791407270082], [78.540428716578276, 25.445782778788171], [78.540359688723001, 25.446360887076164], [78.540014549446582, 25.446404029485716], [78.540013928780326, 25.446921920937285], [78.539809087934159, 25.447482825659538], [78.539343149910991, 25.450140398087918]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Nandanpura Second", "Ward Numbe": 17.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.530376535152811, 25.447612016953165], [78.529755284455263, 25.448233267650711], [78.531619036547895, 25.449510282973442], [78.53375890006167, 25.450269589381552], [78.534336153880574, 25.450339143063964], [78.534649255751717, 25.450847933604575], [78.534235088620022, 25.455196688487387], [78.534393439323267, 25.456146792706811], [78.538624828791555, 25.45534957440119], [78.538645364110508, 25.455343668327767], [78.538859954924007, 25.454299326368705], [78.539084295453677, 25.45319488068418], [78.539084295453677, 25.451607240012677], [78.539343149910991, 25.450140398087918], [78.539809087934159, 25.447482825659538], [78.540013928780326, 25.446921920937285], [78.539653775259794, 25.446913345853464], [78.537341342107823, 25.446827061034359], [78.536668320518814, 25.446861574962], [78.53554661787048, 25.446861574962], [78.535512103942835, 25.447172200310774], [78.534977138064392, 25.446861574962], [78.534131546837173, 25.446999630672568], [78.533424011320534, 25.447137686383133], [78.532198766889266, 25.447137686383133], [78.531437522673315, 25.447280979412017], [78.530376535152811, 25.447612016953165]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Ishaee Tola Second", "Ward Numbe": 26.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.538948269753746, 25.434015031334074], [78.538953438643105, 25.434011540651291], [78.538947723061099, 25.434013619044748], [78.538948269753746, 25.434015031334074]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Lahargird First", "Ward Numbe": 23.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.543920569741417, 25.463070389754176], [78.544016676522901, 25.461556707945942], [78.542166277123016, 25.461492008666223], [78.541389713751087, 25.460801730113396], [78.540751206089709, 25.460232250307314], [78.540578636451514, 25.459628256573588], [78.540630407342974, 25.459076033731328], [78.540682178234434, 25.458523810889066], [78.540733949125894, 25.457764504480956], [78.541096345366128, 25.457402108240721], [78.541734853027492, 25.457022455036665], [78.542718499965275, 25.456815371470817], [78.542166277123016, 25.456142349881812], [78.541924679629517, 25.455969780243603], [78.541855651774242, 25.455521099184267], [78.541579540353112, 25.454951619378182], [78.541424227678718, 25.454692764920875], [78.54134833579262, 25.454566278444034], [78.538624828791555, 25.45534957440119], [78.533861906777062, 25.456246936519864], [78.525233424866727, 25.456246936519864], [78.522058143523722, 25.457144298638539], [78.518006670202425, 25.457017587022804], [78.516076448438625, 25.457366482047497], [78.520625815526529, 25.460060725524237], [78.52538873754105, 25.461786421906307], [78.529530408858008, 25.463581146143657], [78.53146318880593, 25.465030731104594], [78.531837230605504, 25.465369706485465], [78.535106904769009, 25.465298792523338], [78.53693741708534, 25.464839859647441], [78.538697627395052, 25.464442949479565], [78.539965894338309, 25.463591902311016], [78.540091670716265, 25.463615660071298], [78.542680215289366, 25.464374966479408], [78.542994611386405, 25.463079649337725], [78.543920569741417, 25.463070389754176]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Nanakganj", "Ward Numbe": 43.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.548664982326557, 25.45826377776617], [78.549962110529037, 25.45839869790138], [78.550686903009506, 25.458122586480247], [78.550721416937151, 25.457811961131476], [78.550859472647716, 25.45763939149327], [78.551101070141215, 25.457259738289213], [78.55144620941762, 25.457190710433931], [78.551860376549314, 25.456983626868084], [78.552101974042813, 25.456811057229878], [78.552654196885072, 25.456707515446951], [78.553033363977462, 25.456707515446951], [78.553033850089122, 25.456673001519309], [78.552999336161491, 25.453428692321022], [78.552999336161491, 25.451656079884952], [78.550668032418073, 25.452384612304773], [78.549530504715719, 25.452651220360014], [78.550100166239616, 25.455499527979505], [78.548857664844519, 25.455257930486013], [78.548664982326557, 25.45826377776617]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Azadganj", "Ward Numbe": 40.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.542718499965275, 25.456815371470817], [78.54660563106593, 25.45630197679716], [78.546243234825695, 25.455456385569946], [78.547192367835834, 25.455145760221175], [78.54670917284885, 25.457078540169093], [78.548726242100855, 25.457308125287206], [78.548857664844519, 25.455257930486013], [78.550100166239616, 25.455499527979505], [78.549530504715719, 25.452651220360014], [78.546250249679986, 25.453420030134012], [78.542453717639432, 25.454248364397404], [78.54134833579262, 25.454566278444034], [78.541424227678718, 25.454692764920875], [78.541579540353112, 25.454951619378182], [78.541855651774242, 25.455521099184267], [78.541924679629517, 25.455969780243603], [78.542166277123016, 25.456142349881812], [78.542718499965275, 25.456815371470817]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Premganj First", "Ward Numbe": 46.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.548664982326557, 25.45826377776617], [78.548620381592031, 25.459723169874604], [78.548430554989977, 25.460620531993275], [78.547705762509509, 25.460724073776202], [78.547222567522539, 25.460862129486767], [78.546566802897345, 25.46096567126969], [78.546325205403861, 25.461379838401385], [78.545703954706312, 25.461448866256671], [78.545634926851037, 25.46200108909893], [78.544875620442923, 25.461932061243647], [78.544772078660003, 25.463071020855814], [78.543920569741417, 25.463070389754176], [78.542994611386405, 25.463079649337725], [78.542680215289366, 25.464374966479408], [78.54606258019821, 25.465341356453365], [78.547995360146132, 25.46623871857204], [78.548271471567261, 25.463581146143657], [78.549652028672924, 25.463788229709504], [78.549651485180277, 25.460435019632222], [78.549616971252632, 25.459503143585902], [78.549882692170854, 25.458390437240944], [78.548664982326557, 25.45826377776617]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Masihaganj", "Ward Numbe": 16.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.543920569741417, 25.463070389754176], [78.544772078660003, 25.463071020855814], [78.544875620442923, 25.461932061243647], [78.545634926851037, 25.46200108909893], [78.545703954706312, 25.461448866256671], [78.546325205403861, 25.461379838401385], [78.546566802897345, 25.46096567126969], [78.547222567522539, 25.460862129486767], [78.547705762509509, 25.460724073776202], [78.548430554989977, 25.460620531993275], [78.548620381592031, 25.459723169874604], [78.548664982326557, 25.45826377776617], [78.548726242100855, 25.457308125287206], [78.54670917284885, 25.457078540169093], [78.547192367835834, 25.455145760221175], [78.546243234825695, 25.455456385569946], [78.54660563106593, 25.45630197679716], [78.542718499965275, 25.456815371470817], [78.541734853027492, 25.457022455036665], [78.541096345366128, 25.457402108240721], [78.540733949125894, 25.457764504480956], [78.540682178234434, 25.458523810889066], [78.540630407342974, 25.459076033731328], [78.540578636451514, 25.459628256573588], [78.540751206089709, 25.460232250307314], [78.541389713751087, 25.460801730113396], [78.542166277123016, 25.461492008666223], [78.544016676522901, 25.461556707945942], [78.543920569741417, 25.463070389754176]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Civil Lines (North part)", "Ward Numbe": 44.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.554483812768026, 25.45125643571312], [78.554901424190788, 25.451952454751051], [78.556074897730596, 25.452780789014444], [78.557973163750873, 25.453954262554252], [78.55997497155407, 25.455058708238777], [78.561804209719057, 25.455507389298113], [78.562874141475945, 25.456301209633864], [78.56389119905765, 25.456916797117529], [78.565507985579018, 25.455610931081033], [78.567647849092793, 25.454092318264813], [78.569684170823635, 25.451883426895765], [78.56985674046183, 25.45001967480313], [78.56992576831712, 25.448811687335684], [78.569887907897424, 25.448272176354784], [78.569633435656996, 25.448519052408923], [78.569529893874076, 25.447017696556522], [78.569098469778567, 25.446965925665058], [78.567545343034695, 25.447000439592703], [78.566561696096926, 25.447121238339445], [78.565716104869708, 25.447552662434962], [78.565405479520933, 25.447086724411804], [78.564956798461594, 25.446292904076053], [78.564059436342902, 25.444636235549268], [78.563541727428273, 25.444670749476909], [78.561919572829126, 25.445671653378511], [78.560849641072267, 25.446655300316301], [78.561194780348686, 25.447000439592717], [78.562126656395009, 25.447587176362621], [78.563334643862447, 25.449416414527612], [78.55846818006502, 25.450520860212137], [78.554483812768026, 25.45125643571312]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Civil Line (West part)", "Ward Numbe": 49.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.553199608476376, 25.460388850441142], [78.55408231667343, 25.46044869506467], [78.555428359851433, 25.46044869506467], [78.556118638404271, 25.460517722919953], [78.556739889101806, 25.460828348268727], [78.557016000522935, 25.460483208992311], [78.556705375174161, 25.460000014005331], [78.556757146065635, 25.459723902584201], [78.557619994256669, 25.460034527932972], [78.557844334786338, 25.460310639354105], [78.558016904424534, 25.460431438100848], [78.559121350109066, 25.460552236847594], [78.558914266543212, 25.459758416511843], [78.55965631598751, 25.459137165814298], [78.559483746349301, 25.458636713863498], [78.55981162866189, 25.458360602442369], [78.559673572951326, 25.458049977093594], [78.56013951097448, 25.457169871938738], [78.561036873093158, 25.457238899794024], [78.561761665573627, 25.457394212468408], [78.562503715017911, 25.457791122636284], [78.563211250534565, 25.458101747985058], [78.563339176573763, 25.458192362262825], [78.563713261341675, 25.45706051604197], [78.56389119905765, 25.456916797117529], [78.562874141475945, 25.456301209633864], [78.561804209719057, 25.455507389298113], [78.55997497155407, 25.455058708238777], [78.557973163750873, 25.453954262554252], [78.556074897730596, 25.452780789014444], [78.554901424190788, 25.451952454751051], [78.554483812768026, 25.45125643571312], [78.553981369471643, 25.451349194475529], [78.553898329402145, 25.451375144497248], [78.553087722552249, 25.45863270624875], [78.553050980660558, 25.459254530240283], [78.553066991115827, 25.459832907936505], [78.553199608476376, 25.460388850441142]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Premganj Second", "Ward Numbe": 36.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.553056553631421, 25.463970605055572], [78.553051213085126, 25.463970194244318], [78.553046359564036, 25.463901705669155], [78.553025866919498, 25.463741539473695], [78.55300914923582, 25.46359863024206], [78.552991892272019, 25.463415275001466], [78.55290129321196, 25.462602040581416], [78.552847365199995, 25.461745663751813], [78.552838736718101, 25.460738288488784], [78.552838736718073, 25.459746013069093], [78.552840893838564, 25.458941407130954], [78.552855993681888, 25.457893046578846], [78.552853836561411, 25.457360237820883], [78.552859975016332, 25.456707515446951], [78.552654196885072, 25.456707515446951], [78.552101974042813, 25.456811057229878], [78.551860376549314, 25.456983626868084], [78.55144620941762, 25.457190710433931], [78.551101070141215, 25.457259738289213], [78.550859472647716, 25.45763939149327], [78.550721416937151, 25.457811961131476], [78.550686903009506, 25.458122586480247], [78.549962110529037, 25.45839869790138], [78.549882692170854, 25.458390437240944], [78.549616971252632, 25.459503143585902], [78.549651485180277, 25.460435019632222], [78.549652028672924, 25.463788229709504], [78.549548486889989, 25.465824551440345], [78.551032585778572, 25.466928997124867], [78.55165383647612, 25.467274136401283], [78.553320003252054, 25.466374406342279], [78.553320003252054, 25.466374406342275], [78.553321038522185, 25.466371052483336], [78.553333795867545, 25.466316467223759], [78.553234568325607, 25.465503232803712], [78.553191425916054, 25.465155936406823], [78.553173629672116, 25.465009252214347], [78.553148525477695, 25.46472405454308], [78.55314852547771, 25.464724054543076], [78.553068364016767, 25.464162523817489], [78.553056553631421, 25.463970605055572]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Bagicha Puliya Mo 9", "Ward Numbe": 25.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.552853836561411, 25.457360237820883], [78.552855993681888, 25.457893046578846], [78.552840893838564, 25.458941407130954], [78.552838736718073, 25.459746013069093], [78.552838736718101, 25.460738288488784], [78.552847365199995, 25.461745663751813], [78.55290129321196, 25.462602040581416], [78.552991892272019, 25.463415275001466], [78.55300914923582, 25.46359863024206], [78.553025866919498, 25.463741539473695], [78.553046359564036, 25.463901705669155], [78.553051213085126, 25.463970194244318], [78.553056553631421, 25.463970605055572], [78.553068364016767, 25.464162523817489], [78.553125736964574, 25.464564421096263], [78.553139806142241, 25.464662975631708], [78.553148525477695, 25.46472405454308], [78.553173629672116, 25.465009252214347], [78.553191425916054, 25.465155936406823], [78.553234568325607, 25.465503232803712], [78.553333795867545, 25.466316467223759], [78.553321038522185, 25.466371052483336], [78.553320003252054, 25.466374406342275], [78.553320003252054, 25.466374406342279], [78.55345519572036, 25.467416672997889], [78.553552102496397, 25.468792749217503], [78.561086531069165, 25.472299366410887], [78.558780255371204, 25.47038732587497], [78.556023619071098, 25.467385261810989], [78.553814727702061, 25.462967479072891], [78.553199608476376, 25.460388850441142], [78.553066991115827, 25.459832907936505], [78.553050980660558, 25.459254530240241], [78.553087722552249, 25.45863270624875], [78.553075607607227, 25.45874117432005], [78.553898329402145, 25.451375144497248], [78.553439997654507, 25.451518373168383], [78.553981369471643, 25.451349194475529], [78.55846818006502, 25.450520860212137], [78.563334643862447, 25.449416414527612], [78.562126656395009, 25.447587176362621], [78.561194780348686, 25.447000439592717], [78.560849641072267, 25.446655300316301], [78.561919572829126, 25.445671653378511], [78.560711585361688, 25.444912346970401], [78.560588629494376, 25.443248128521944], [78.556446958177403, 25.439727707902524], [78.553823899676658, 25.435102841598582], [78.553457189195356, 25.434132137383664], [78.556632470538361, 25.429886924283778], [78.558358166920428, 25.428299283612272], [78.559255529039106, 25.427609005059445], [78.560190025451277, 25.427348215363025], [78.559538111821936, 25.426257569080246], [78.558675263630903, 25.425256665178647], [78.558088526860999, 25.424911525902235], [78.556431858334207, 25.425015067685159], [78.555638037998463, 25.425256665178647], [78.554291994820446, 25.425291179106289], [78.553877827688751, 25.425153123395724], [78.553394632701767, 25.425187637323365], [78.552807895931863, 25.425394720889212], [78.551599908464425, 25.42580888802091], [78.551254769188006, 25.42580888802091], [78.549391017095374, 25.423185829520165], [78.548217543555566, 25.421874300269792], [78.546767958594629, 25.420252145670649], [78.545525457199531, 25.418699018926787], [78.54520276748265, 25.418363918066937], [78.544310998370406, 25.418704411727976], [78.541731082279284, 25.420490507483407], [78.54145497085814, 25.425943708050742], [78.541662054423995, 25.428773850117334], [78.541938165845124, 25.431949131460343], [78.541731082279284, 25.433053577144864], [78.54152399871343, 25.438161638435787], [78.541931694484049, 25.442599104898289], [78.541690096990564, 25.44691334585346], [78.541931694484049, 25.450157655051747], [78.541879923592617, 25.45140015644683], [78.542880827494216, 25.451503698229754], [78.543208709806805, 25.451866094469988], [78.542552945181612, 25.452866998371587], [78.541810895737328, 25.452728942661022], [78.541638326099118, 25.453074081937434], [78.541638326099118, 25.453885159237007], [78.541650453212085, 25.454479387772128], [78.542181062484858, 25.454326781555942], [78.542453717639432, 25.454248364397404], [78.546250249679986, 25.453420030134012], [78.550668032418073, 25.452384612304773], [78.552999336161491, 25.451656079884952], [78.552999336161491, 25.453428692321022], [78.553033850089122, 25.456673001519309], [78.553030352862962, 25.456921304576301], [78.553033363977462, 25.456707515446951], [78.552859975016332, 25.456707515446951], [78.552853836561411, 25.457360237820883]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "CP Mission Compund", "Ward Numbe": 57.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.563211250534565, 25.458101747985058], [78.562503715017911, 25.457791122636284], [78.561761665573627, 25.457394212468408], [78.561036873093158, 25.457238899794024], [78.56013951097448, 25.457169871938738], [78.559673572951326, 25.458049977093594], [78.55981162866189, 25.458360602442369], [78.559483746349301, 25.458636713863498], [78.55965631598751, 25.459137165814298], [78.558914266543212, 25.459758416511843], [78.559121350109066, 25.460552236847594], [78.558016904424534, 25.460431438100848], [78.557844334786338, 25.460310639354105], [78.557619994256669, 25.460034527932972], [78.556757146065635, 25.459723902584201], [78.556705375174161, 25.460000014005331], [78.557016000522935, 25.460483208992311], [78.556739889101806, 25.460828348268727], [78.556118638404271, 25.460517722919953], [78.555428359851433, 25.46044869506467], [78.55408231667343, 25.46044869506467], [78.553199608476376, 25.460388850441142], [78.553814727702061, 25.462967479072891], [78.556023619071098, 25.467385261810989], [78.558780255371204, 25.47038732587497], [78.561050269224339, 25.472269303172013], [78.56122610143106, 25.472350185987104], [78.561198058864846, 25.471828162831528], [78.56117864478054, 25.471670693036664], [78.560839976865566, 25.468734852066667], [78.560667407227356, 25.467725319683158], [78.560676035709278, 25.46675030122729], [78.560952147130365, 25.464757121905997], [78.562367218163658, 25.461133159503653], [78.563339176573763, 25.458192362262825], [78.563211250534565, 25.458101747985058]], [[78.562806856670235, 25.460661891514228], [78.56254702194957, 25.460589137792439], [78.562862844838307, 25.459633571103435], [78.564101128956793, 25.45948841797442], [78.564446268233212, 25.460938002935357], [78.563514392186889, 25.460886232043897], [78.562806856670235, 25.460661891514228]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Bahar Khanderao Gate", "Ward Numbe": 53.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.563707734789091, 25.457077237406203], [78.563859531463336, 25.457245012677735], [78.565585227845403, 25.458780882457773], [78.567241896372181, 25.45943664708296], [78.568743252224579, 25.459764529395553], [78.570279122004621, 25.459126021734189], [78.571884019639953, 25.459281334408576], [78.573885827443149, 25.459609216721169], [78.572557041228961, 25.457710950700893], [78.573799542624045, 25.457348554460658], [78.573299090673245, 25.456313136631415], [78.571780477857018, 25.45662376198019], [78.571349053761509, 25.454587440249348], [78.570417177715186, 25.452809972975817], [78.569684170823635, 25.451883426895765], [78.567647849092793, 25.454092318264813], [78.565507985579018, 25.455610931081033], [78.563713261341675, 25.45706051604197], [78.563707734789091, 25.457077237406203]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Nayi Basti (First)", "Ward Numbe": 8.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.567690577431534, 25.46544207049255], [78.567699704475757, 25.465417731707955], [78.568104744563215, 25.465247929649557], [78.569489087057249, 25.464109692487796], [78.569424902295523, 25.463992485531609], [78.569039604290211, 25.463426579086313], [78.569174676320102, 25.463353977870248], [78.569381759885957, 25.463043352521474], [78.569502558632706, 25.46268095628124], [78.569278218103037, 25.461800851126387], [78.569105648464827, 25.461369427030871], [78.568605196514028, 25.461283142211766], [78.567966688852664, 25.460765433297144], [78.568208286346149, 25.45986807117847], [78.568239911066655, 25.459654604315087], [78.567241896372181, 25.45943664708296], [78.565585227845403, 25.458780882457773], [78.563859531463336, 25.457245012677735], [78.563707734789091, 25.457077237406203], [78.562862844838307, 25.459633571103435], [78.564101128956793, 25.45948841797442], [78.564446268233212, 25.460938002935357], [78.563514392186889, 25.460886232043897], [78.562806856670235, 25.460661891514228], [78.56254702194957, 25.460589137792439], [78.562367218163658, 25.461133159503653], [78.561033159350117, 25.464549651587131], [78.563134738982868, 25.465183216035239], [78.564152899848295, 25.465718181913683], [78.565464429098654, 25.466235890828301], [78.566102936760032, 25.466408460466511], [78.566154707651492, 25.465873494588067], [78.56615652460539, 25.465873027371352], [78.566137450687663, 25.465679353745081], [78.567276410299826, 25.465308329022935], [78.567523709337479, 25.465491512890786], [78.567690577431534, 25.46544207049255]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Lahargird Second", "Ward Numbe": 31.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.553320003252054, 25.466374406342275], [78.55165383647612, 25.467274136401283], [78.551032585778572, 25.466928997124867], [78.549548486889989, 25.465824551440345], [78.549652028672924, 25.463788229709504], [78.548271471567261, 25.463581146143657], [78.547995360146132, 25.46623871857204], [78.54606258019821, 25.465341356453365], [78.542680215289366, 25.464374966479408], [78.540091670716265, 25.463615660071298], [78.539965894338309, 25.463591902311016], [78.538697627395052, 25.464442949479565], [78.53693741708534, 25.464839859647441], [78.535106904769009, 25.465298792523338], [78.531837230605504, 25.465369706485465], [78.53146318880593, 25.465030731104594], [78.529530408858008, 25.463581146143657], [78.52538873754105, 25.461786421906307], [78.520625815526529, 25.460060725524237], [78.516076448438625, 25.457366482047497], [78.519993779225942, 25.466719756438323], [78.524182907193264, 25.472550453089241], [78.5289911287378, 25.480577098386348], [78.536894818167653, 25.485340020400855], [78.538724056332669, 25.490275512053572], [78.536050266106102, 25.491996199997967], [78.536100997831923, 25.494279127659969], [78.538068291707461, 25.495694198693261], [78.53537620535144, 25.502044761379267], [78.534408209721136, 25.502341405201452], [78.535052637280444, 25.506231732226468], [78.536640277951946, 25.507474233621558], [78.539884587150226, 25.5045060358444], [78.542783757072101, 25.5025042280412], [78.546856400533784, 25.500502420238], [78.549548486889819, 25.498638668145368], [78.554518492470166, 25.491942966182947], [78.559902665182221, 25.485316292075805], [78.564969491770867, 25.475715989065737], [78.564182392209929, 25.475108797975871], [78.562560237610782, 25.473521157304369], [78.561086531069165, 25.472299366410887], [78.553552102496397, 25.468792749217503], [78.55345519572036, 25.467416672997889], [78.553320003252054, 25.466374406342275]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "simardha", "Ward Numbe": 21.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.571508296478186, 25.474129703079473], [78.571637400580272, 25.473978466845608], [78.571929996450081, 25.473528319353591], [78.571508296478186, 25.474129703079473]], [[78.569671892590378, 25.475451109508562], [78.570294205696385, 25.47511642328514], [78.571033406846553, 25.474686002362258], [78.571637400580272, 25.473978466845608], [78.572086081639611, 25.473288188292781], [78.572155109494901, 25.474064751664713], [78.573483895709074, 25.47459971754315], [78.573915319804598, 25.475151940385409], [78.575537474403745, 25.476687810165451], [78.579247721625208, 25.477205519080073], [78.585788110913242, 25.477809512813799], [78.587651863005874, 25.477395345682101], [78.59048200507246, 25.477844026741437], [78.593553744632544, 25.478361735656058], [78.595141385304046, 25.476221872142293], [78.596073261350355, 25.476152844287011], [78.598178610936486, 25.475428051806542], [78.600491044088457, 25.474910342891921], [78.601871601194105, 25.475393537878901], [78.602320282253444, 25.475876732865878], [78.603873408997316, 25.474151036483807], [78.602837991168073, 25.472045686897683], [78.602803477240428, 25.470665129792028], [78.60483979897127, 25.470975755140802], [78.606151328221642, 25.471562491910706], [78.611017792019069, 25.471010269068447], [78.616401964731125, 25.470423532298543], [78.616988701501029, 25.473253674365136], [78.617299326849803, 25.47384041113504], [78.617748007909142, 25.474530689687867], [78.618231202896112, 25.475289996095977], [78.618748911810741, 25.475704163227675], [78.617333840777462, 25.480225487748694], [78.619335648580659, 25.478154652090211], [78.619749815712353, 25.480156459893411], [78.620163982844062, 25.482020211986043], [78.620371066409746, 25.48456561414957], [78.615781888799589, 25.487102026789643], [78.615400611250323, 25.487114252781652], [78.608774386722246, 25.48732672836088], [78.604193142119513, 25.491513645416354], [78.597609131130298, 25.49554967162144], [78.597055682257192, 25.495793189125607], [78.59070634560203, 25.49858689725388], [78.58351019168876, 25.498233129495553], [78.570809066316727, 25.502788967944213], [78.566874358933291, 25.507065823795781], [78.563216002235635, 25.506102304997786], [78.558107940944709, 25.51659453900076], [78.56123145139631, 25.529925543552242], [78.558125197908595, 25.52909720928885], [78.555976705912911, 25.529269778927059], [78.553819585435321, 25.529692574540665], [78.551403610500415, 25.53031382523821], [78.54999716794903, 25.531133531019691], [78.548642496289105, 25.531590840560945], [78.546028066270281, 25.531487298778021], [78.544198828105323, 25.530546794249794], [78.542404103867995, 25.528890125723009], [78.541299658183462, 25.526888317919809], [78.533463948138632, 25.531587112072366], [78.531014507746335, 25.533376936316387], [78.526769294646456, 25.53403270094157], [78.523490471520518, 25.53423978450742], [78.521592205500255, 25.533929159158646], [78.517416020255624, 25.529338806782349], [78.515759351728818, 25.526853803992168], [78.514931017465429, 25.525266163320666], [78.513481432504491, 25.524541370840197], [78.504024616330753, 25.525921927945852], [78.502242834815704, 25.515712276725242], [78.504279156546559, 25.512157342178199], [78.506798673264342, 25.510845812927808], [78.510905830653698, 25.509189144401041], [78.514115625924333, 25.506945739104335], [78.516324517293398, 25.505530668071053], [78.518395352951856, 25.505220042722268], [78.520604244320921, 25.504771361662943], [78.524069587814495, 25.504953826082101], [78.528956614810099, 25.504012055254815], [78.534408209721136, 25.502341405201452], [78.535052637280444, 25.506231732226468], [78.536640277951946, 25.507474233621558], [78.539884587150226, 25.5045060358444], [78.542783757072101, 25.5025042280412], [78.546856400533784, 25.500502420238], [78.549548486889819, 25.498638668145368], [78.554518492470166, 25.491942966182947], [78.559902665182221, 25.485316292075805], [78.565148782183712, 25.475376280915089], [78.568910800296607, 25.476756838020741], [78.569671892590378, 25.475451109508562]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "gusainpura", "Ward Numbe": 58.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.577267080087239, 25.463074390620363], [78.577336107942529, 25.463070076379417], [78.577508677580724, 25.463044190933683], [78.577853816857143, 25.462923392186941], [78.578427736867425, 25.462655562848806], [78.579053175842688, 25.462328026935122], [78.578526838446166, 25.461318494551612], [78.579286144854265, 25.461094154021943], [78.580416475984521, 25.460567816625414], [78.580658073478006, 25.461353008479254], [78.580832800236735, 25.461617255737771], [78.581300895380366, 25.461498614111502], [78.581817281067117, 25.461237404348434], [78.581160682549324, 25.460225913029731], [78.581969602728378, 25.459937937445957], [78.581555435596684, 25.458479724003112], [78.581529550150961, 25.458402067665919], [78.581365608994659, 25.458238126509624], [78.581249124488906, 25.458301761563717], [78.580895356730593, 25.45839667486473], [78.580584731381819, 25.458405303346641], [78.580373333574983, 25.45837510365995], [78.580079965190023, 25.45793936532348], [78.579989366129993, 25.457926422600611], [78.579777968323185, 25.45784013778151], [78.579601084444022, 25.457723653275718], [78.579406943601043, 25.457611483010883], [78.579182603071374, 25.45746479881841], [78.578971205264565, 25.457322428866888], [78.578798635626356, 25.457145544987725], [78.578630380229086, 25.456969739668803], [78.578397411217509, 25.456995625114534], [78.577991872567722, 25.456978368150715], [78.577405135797818, 25.456857569403969], [78.577042739557584, 25.45666774280194], [78.576757999654532, 25.456521058609464], [78.576550916088692, 25.456426145308452], [78.576214405294181, 25.456434773790363], [78.575843380572039, 25.456460659236093], [78.575541383705186, 25.456503801645646], [78.575463727367989, 25.456521058609464], [78.575222129874504, 25.456546944055198], [78.574980532381005, 25.456624600392391], [78.574920133007637, 25.456650485838122], [78.574669907032231, 25.456831683958239], [78.574454194984483, 25.457056024487908], [78.574238482936721, 25.457228594126114], [78.574126312671879, 25.457288993499485], [78.574022770888959, 25.457478820101514], [78.573996885443222, 25.457746303040736], [78.573789801877368, 25.458281268919173], [78.573763916431645, 25.458790349351883], [78.573798430359275, 25.459273544338863], [78.57384612978737, 25.459552505784345], [78.573885827443149, 25.459609216721169], [78.573977087878802, 25.459658823265862], [78.574039488572609, 25.459676386588036], [78.574251576565416, 25.459808027411164], [78.574539940523408, 25.459987011936811], [78.574867386936575, 25.46027667607154], [78.57517035898303, 25.460455646360579], [78.575371224966318, 25.460814870364821], [78.575390183379511, 25.460846467720145], [78.575423757194429, 25.460902424078323], [78.575515498259435, 25.461055325853344], [78.575539342403246, 25.461190442668229], [78.575619040042369, 25.461430664816451], [78.57570532486146, 25.461555777804143], [78.576007321728326, 25.46139615088881], [78.576223033776088, 25.461404779370721], [78.576309318595193, 25.461547149322232], [78.576481180980792, 25.461753384184941], [78.576525030642955, 25.461806003779543], [78.576749371172625, 25.462159771537866], [78.576904683847005, 25.462444511440907], [78.577034111075662, 25.462755136789681], [78.577180795268134, 25.46294496339171], [78.577267080087239, 25.463074390620363]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "dadiyapura first", "Ward Numbe": 50.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.583106405220093, 25.466856901377838], [78.583351103574856, 25.467084679818402], [78.583601329550262, 25.467300391866164], [78.58398961123622, 25.467615331455889], [78.584572033765184, 25.468124411888603], [78.584723032198596, 25.468473865405969], [78.584796374294839, 25.468754291068056], [78.58476186036718, 25.469159829717846], [78.584869716391054, 25.46992776460786], [78.584997770139921, 25.470421424999422], [78.585204853705761, 25.470973647841685], [78.585515479054536, 25.471767468177436], [78.58570530565656, 25.472371461911159], [78.585480965126891, 25.472802886006676], [78.58544645119926, 25.472992712608704], [78.585463708163076, 25.473458650631862], [78.585532736018365, 25.473959102582661], [78.585619020837456, 25.474511325424924], [78.58582610440331, 25.475201603977752], [78.58592964618623, 25.475822854675297], [78.58610221582444, 25.476599418047229], [78.58598141707769, 25.477289696600053], [78.585363592157975, 25.477770309234817], [78.585788110913242, 25.477809512813799], [78.587651863005874, 25.477395345682101], [78.59048200507246, 25.477844026741437], [78.593553744632544, 25.478361735656058], [78.595141385304046, 25.476221872142293], [78.596073261350355, 25.476152844287011], [78.598178610936486, 25.475428051806542], [78.600491044088457, 25.474910342891921], [78.601871601194105, 25.475393537878901], [78.602320282253444, 25.475876732865878], [78.603873408997316, 25.474151036483807], [78.602837991168073, 25.472045686897683], [78.602803477240428, 25.470665129792028], [78.602216740470752, 25.469586569553258], [78.601388406207363, 25.4686201795793], [78.599869793391136, 25.467791845315908], [78.599869793391136, 25.466066148933837], [78.599869793391136, 25.465175216677746], [78.593759209878868, 25.468113626286115], [78.592302198121573, 25.466754570233732], [78.592095126250229, 25.464846465092727], [78.590902238626057, 25.464829208128908], [78.590063118760312, 25.465310245995408], [78.589725529405598, 25.464763415954327], [78.589862506555903, 25.464680366815948], [78.59037266554887, 25.464394548352665], [78.591235378920032, 25.464049611306326], [78.590294874391802, 25.463820956535702], [78.589423397718861, 25.464317094245544], [78.58922831313545, 25.463224310493583], [78.590011711236826, 25.46249067046848], [78.59081258330643, 25.462134088322227], [78.590389787692828, 25.461892490828738], [78.590052507497774, 25.462011392013302], [78.589880167980013, 25.462142177524008], [78.589615111801223, 25.46238465134768], [78.589470449909172, 25.462447207841528], [78.588966762277693, 25.46260845259723], [78.588541809543585, 25.462793425678182], [78.587853688111181, 25.462993498602465], [78.587542523482298, 25.463327312996377], [78.587363482482644, 25.463465907987061], [78.586634375761221, 25.463806733022519], [78.586622511598549, 25.463875760877812], [78.585884776395204, 25.464445240683897], [78.585487866227339, 25.464760180273625], [78.584944271866988, 25.465113948031949], [78.584685417409673, 25.465282203429201], [78.584318706928485, 25.465515172440778], [78.584176336976967, 25.46568342783803], [78.584016710061633, 25.465855997476236], [78.583852768905331, 25.465989738945847], [78.58371902743572, 25.466140737379277], [78.583550772038464, 25.466326249740352], [78.583326431508794, 25.466585104197662], [78.583231518207782, 25.466761988076822], [78.583106405220093, 25.466856901377838]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "bahar datiya gate first", "Ward Numbe": 39.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.575727469051145, 25.475907879769711], [78.575882781725539, 25.475476455674194], [78.575986323508459, 25.475200344253064], [78.57614163618284, 25.474751663193725], [78.576279691893404, 25.473198536449864], [78.576331462784864, 25.472214889512085], [78.576348719748694, 25.471766208452745], [78.576227921001944, 25.470592734912941], [78.576296948857234, 25.47033388045563], [78.576383233676339, 25.469988741179218], [78.576176150110484, 25.46931571959021], [78.575749624472508, 25.468899857093174], [78.575763086872826, 25.468902247174348], [78.575738625409201, 25.468834104525676], [78.574871462977228, 25.467768487009746], [78.574357158267674, 25.46722816624801], [78.574070800524382, 25.466912687378162], [78.573735907570125, 25.466434345912258], [78.573654295162513, 25.466149595372531], [78.573466330156208, 25.465493774296228], [78.572490170494149, 25.466125877683957], [78.569452944861709, 25.466367475177446], [78.567934332045496, 25.466263933394522], [78.566484747084559, 25.466263933394522], [78.566105093880495, 25.467161295513197], [78.565621898893525, 25.467023239802632], [78.564759050702492, 25.467506434789613], [78.563758146800879, 25.468300255125364], [78.56299884039278, 25.468265741197722], [78.56303335432041, 25.468817964039985], [78.563343979669185, 25.468990533678191], [78.56272272897165, 25.469370186882244], [78.562584673261085, 25.469956923652148], [78.562757242899281, 25.470233035073282], [78.562550159333441, 25.470992341481391], [78.563067868248055, 25.471268452902521], [78.563792660728524, 25.471579078251292], [78.564206827860218, 25.472269356804119], [78.565000648195976, 25.473028663212229], [78.564517453208992, 25.473891511403266], [78.564137800004943, 25.474443734245526], [78.563764848638343, 25.474700138310066], [78.564182392209929, 25.475108797975871], [78.564969491770867, 25.475715989065737], [78.565148782183712, 25.475376280915089], [78.56568442182747, 25.475572845921974], [78.568910800296607, 25.476756838020741], [78.569671892590378, 25.475451109508562], [78.570294205696385, 25.47511642328514], [78.571033406846553, 25.474686002362258], [78.571508296478186, 25.474129703079473], [78.571929996450081, 25.473528319353591], [78.572086081639611, 25.473288188292781], [78.572087465262683, 25.473303754052328], [78.572155109494901, 25.474064751664713], [78.573483895709074, 25.47459971754315], [78.573915319804598, 25.475151940385409], [78.575537474403745, 25.476687810165451], [78.575637351067442, 25.476701746444107], [78.575623927268225, 25.476339303865227], [78.575727469051145, 25.475907879769711]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "Gudri", "Ward Numbe": 20.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.58845974302811, 25.462817286710496], [78.588407393974165, 25.462774753104163], [78.588226195854048, 25.462731610694611], [78.588096768625405, 25.46269709676697], [78.587932827469103, 25.462653954357418], [78.587673973011789, 25.462602183465957], [78.587268434362002, 25.462619440429776], [78.586785239375033, 25.462679839803148], [78.586483242508166, 25.46274886765843], [78.586172617159392, 25.462861037923265], [78.585948276629722, 25.462964579706192], [78.585767078509605, 25.4629732081881], [78.585430567715107, 25.462964579706192], [78.58420532328384, 25.463352861392156], [78.583307961165161, 25.463637601295197], [78.58254002627514, 25.463879198788685], [78.581728948975567, 25.46418982413746], [78.581444209072529, 25.464362393775666], [78.582005060396696, 25.465380554641087], [78.58254002627514, 25.466260659795942], [78.583077129090185, 25.466880021749283], [78.583106405220093, 25.466856901377838], [78.583231518207782, 25.466761988076822], [78.583326431508794, 25.466585104197662], [78.583550772038464, 25.466326249740352], [78.58371902743572, 25.466140737379277], [78.583852768905331, 25.465989738945847], [78.584016710061633, 25.465855997476236], [78.584176336976967, 25.46568342783803], [78.584318706928485, 25.465515172440778], [78.584685417409673, 25.465282203429201], [78.584944271866988, 25.465113948031949], [78.585487866227339, 25.464760180273625], [78.585884776395204, 25.464445240683897], [78.586622511598549, 25.463875760877812], [78.586634375761221, 25.463806733022519], [78.587363482482644, 25.463465907987061], [78.587542523482298, 25.463327312996377], [78.587853688111181, 25.462993498602465], [78.58845974302811, 25.462817286710496]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "aligole first", "Ward Numbe": 30.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.575769015891694, 25.468918763726894], [78.576176150110484, 25.46931571959021], [78.576383233676339, 25.469988741179218], [78.576296948857234, 25.47033388045563], [78.576227921001944, 25.470592734912941], [78.576348719748694, 25.471766208452745], [78.576331462784864, 25.472214889512085], [78.576279691893404, 25.473198536449864], [78.57614163618284, 25.474751663193725], [78.575986323508459, 25.475200344253064], [78.575882781725539, 25.475476455674194], [78.575727469051145, 25.475907879769711], [78.575623927268225, 25.476339303865227], [78.575637351067442, 25.476701746444107], [78.579247721625208, 25.477205519080073], [78.585363592157975, 25.477770309234817], [78.58598141707769, 25.477289696600053], [78.58610221582444, 25.476599418047229], [78.58592964618623, 25.475822854675297], [78.58582610440331, 25.475201603977752], [78.585619020837456, 25.474511325424924], [78.585532736018365, 25.473959102582661], [78.585463708163076, 25.473458650631862], [78.58544645119926, 25.472992712608704], [78.585480965126891, 25.472802886006676], [78.58570530565656, 25.472371461911159], [78.585515479054536, 25.471767468177436], [78.585204853705761, 25.470973647841685], [78.584997770139921, 25.470421424999422], [78.584869716391054, 25.46992776460786], [78.58476186036718, 25.469159829717846], [78.584796374294839, 25.468754291068056], [78.584723032198596, 25.468473865405969], [78.584572033765184, 25.468124411888603], [78.58398961123622, 25.467615331455889], [78.583601329550262, 25.467300391866164], [78.583351103574856, 25.467084679818402], [78.583106405220093, 25.466856901377838], [78.582835928271038, 25.467070506371005], [78.582506186447063, 25.467281314831716], [78.582149130014486, 25.467908298669169], [78.582095047313715, 25.46799986692918], [78.581649919158693, 25.468436874160044], [78.581339293809918, 25.46883378432792], [78.581204163008465, 25.469097289390756], [78.580976897569698, 25.469316979314897], [78.58112573888269, 25.469588776495073], [78.580931598039683, 25.470050400277277], [78.580821584895347, 25.47014962781925], [78.579643797114556, 25.470283369288858], [78.578887040426451, 25.470450427009204], [78.578617437506082, 25.47007963937126], [78.57874686473474, 25.469924326696873], [78.57848035163174, 25.469796653957665], [78.577443534227427, 25.469403264134005], [78.576641085409761, 25.46905812485759], [78.575763086872826, 25.468902247174348], [78.575769015891694, 25.468918763726894]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "mukaryana", "Ward Numbe": 52.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.574560837628454, 25.465710594074142], [78.575044032615438, 25.465607052291219], [78.575561741530052, 25.465900420676171], [78.575872366878826, 25.466159275133478], [78.575872366878826, 25.466797782794846], [78.576062193480851, 25.466659727084281], [78.576148478299956, 25.466331844771688], [78.576603630720712, 25.466317823488577], [78.576643627513405, 25.466316691503881], [78.576645750051426, 25.46625256867393], [78.576871113659962, 25.466303802205481], [78.577129968117276, 25.466346944615033], [78.577362937128854, 25.466424600952227], [78.577535506767063, 25.466562656662791], [78.577673562477628, 25.466623056036166], [78.578061844163585, 25.466683455409537], [78.577933832018971, 25.465841951967811], [78.577985602910431, 25.465496812691395], [78.578046002283799, 25.465289729125548], [78.577933832018971, 25.465091274041608], [78.577735376935024, 25.46484967654812], [78.577536921851092, 25.464547679681257], [78.57742475158625, 25.464124884067651], [78.577312581321422, 25.463736602381687], [78.57726943891187, 25.463546775779658], [78.577178899916134, 25.463378631930446], [78.576680343317335, 25.463635241944537], [78.576562577063584, 25.463685211959941], [78.575558101388822, 25.464111426289953], [78.574592115875376, 25.464613698311286], [78.573542574022582, 25.46544338850115], [78.573542845287207, 25.465444227613041], [78.573466330156208, 25.465493774296228], [78.573654295162513, 25.466149595372531], [78.574560837628454, 25.465710594074142]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "aligole second", "Ward Numbe": 38.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.578763025903513, 25.467518427787802], [78.578731273536462, 25.467477603315889], [78.578593217825897, 25.467261891268127], [78.578498304524885, 25.467141092521384], [78.578465947717717, 25.467054807702279], [78.578431433790072, 25.466949108798879], [78.578431433790072, 25.466867138220731], [78.578434868762471, 25.466798438772852], [78.578355212548544, 25.46675248326482], [78.578061844163585, 25.466683455409537], [78.577673562477628, 25.466623056036166], [78.577535506767063, 25.466562656662791], [78.577362937128854, 25.466424600952227], [78.577129968117276, 25.466346944615033], [78.576871113659962, 25.466303802205481], [78.576645750051426, 25.46625256867393], [78.576643627513405, 25.466316691503881], [78.576603630720712, 25.466317823488577], [78.576148478299956, 25.466331844771688], [78.576062193480851, 25.466659727084281], [78.575872366878826, 25.466797782794846], [78.575872366878826, 25.466159275133478], [78.575561741530052, 25.465900420676171], [78.575044032615438, 25.465607052291219], [78.574560837628454, 25.465710594074142], [78.573654295162513, 25.466149595372531], [78.573735907570125, 25.466434345912258], [78.574057624295762, 25.46689386722554], [78.574357158267674, 25.46722816624801], [78.574871462977228, 25.467768487009746], [78.575738625409201, 25.468834104525676], [78.575763086872826, 25.468902247174348], [78.576641085409761, 25.46905812485759], [78.577443534227427, 25.469403264134005], [78.578119339092453, 25.469673446265855], [78.578113615055045, 25.469427312657025], [78.578104986573138, 25.469237486054997], [78.578104986573138, 25.469099430344432], [78.578087729609308, 25.46878017651375], [78.5780791011274, 25.468521322056439], [78.578087729609308, 25.468314238490592], [78.57813087201886, 25.468176182780027], [78.578294813175162, 25.468038127069459], [78.57835521254853, 25.467977727696088], [78.578381097994267, 25.467882814395075], [78.578458754331464, 25.46774475868451], [78.578622695487752, 25.467641216901583], [78.578763025903513, 25.467518427787802]]]] } },
		{ "type": "Feature", "properties": { "id": 1, "Ward Name": "mewatipura", "Ward Numbe": 48.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.578960621366292, 25.467054253676206], [78.578995135293923, 25.466873055556089], [78.578999449534876, 25.466709114399794], [78.5789692498482, 25.466506345074901], [78.579046906185383, 25.466282004545231], [78.579051220426351, 25.466131006111802], [78.578947678643431, 25.465816066522073], [78.578593910885104, 25.46553995510094], [78.578404084283079, 25.46546229876375], [78.578014787887639, 25.465396749912376], [78.577985602910431, 25.465496812691395], [78.577933832018971, 25.465841951967811], [78.578061844163585, 25.466683455409537], [78.578355212548544, 25.46675248326482], [78.578434868762471, 25.466798438772855], [78.578431433790072, 25.466867138220731], [78.578431433790072, 25.466949108798879], [78.578465947717717, 25.467054807702279], [78.578498304524885, 25.467141092521384], [78.578593217825897, 25.467261891268127], [78.578731273536462, 25.467477603315889], [78.578763025903513, 25.467518427787798], [78.578622695487752, 25.467641216901583], [78.578458754331464, 25.46774475868451], [78.578381097994267, 25.467882814395075], [78.57835521254853, 25.467977727696088], [78.578294813175162, 25.468038127069459], [78.57813087201886, 25.468176182780027], [78.578087729609308, 25.468314238490592], [78.5780791011274, 25.468521322056439], [78.578087729609308, 25.46878017651375], [78.578104986573138, 25.469099430344432], [78.578104986573138, 25.469237486054997], [78.578113615055045, 25.469427312657025], [78.578119339092453, 25.469673446265855], [78.57874686473474, 25.469924326696873], [78.578617437506082, 25.47007963937126], [78.578887040426451, 25.470450427009204], [78.579643797114556, 25.470283369288858], [78.580821584895347, 25.47014962781925], [78.580931598039683, 25.470050400277277], [78.58112573888269, 25.469588776495073], [78.580976897569698, 25.469316979314897], [78.581204163008465, 25.469097289390756], [78.581339293809918, 25.46883378432792], [78.581649919158693, 25.468436874160044], [78.582095047313715, 25.46799986692918], [78.582503139490484, 25.46728666522554], [78.582835928271038, 25.467070506371005], [78.583077129090185, 25.466880021749283], [78.582777257550489, 25.466534223854776], [78.582621254816758, 25.466644400785469], [78.582512320232638, 25.466732842725047], [78.582351614757059, 25.46686334851394], [78.581996768438486, 25.466977675899258], [78.581699085812602, 25.46709200328457], [78.58144346703601, 25.467208487790359], [78.581326982530186, 25.467253787320388], [78.581255797554419, 25.467277515645641], [78.581225597867743, 25.467335757898535], [78.580869672988939, 25.467536370102952], [78.580666903664039, 25.467657168849698], [78.580222536845682, 25.467624812042533], [78.579853669244002, 25.467525584500564], [78.579603443268596, 25.46744792816337], [78.579512844208537, 25.467340072139493], [78.579320860486035, 25.46727104428421], [78.579066125133821, 25.467199975344375], [78.579071376547091, 25.467192535842248], [78.578961537324687, 25.467130293616215], [78.578960621366292, 25.467054253676206]]]] } }
	]
}

let wards = [];

wardDivision.features.map((ward) => {
	wards.push({ "ward_name": ward.properties["Ward Name"], "ward_number": ward.properties["Ward Numbe"] })
})



// const mediageoJSON = {
// 	"type": "FeatureCollection",
// 	"name": "video kml to geojson",
// 	"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
// 	"features": [
// 		{
// 			"type": "Feature", "properties": {
// 				"Name": "E L1",
				// "description": "<img src=\"https://doc-00-0s-mymaps.googleusercontent.com/untrusted/hostedimage/ltbtr56dsv8l0lhgq4hd7gmrfk/m6t8qadn34r07vunck8bd59m2c/1697984447250/8AE0li_iM5vtQQwsLcDqdp-kpBjOzk1B/03630732761502837539/5AJ9UNGoaldcLj0SVVtV215awH09VjxU16NUn1mnpdJLuFtm8sFWbsQsDHMjA5MGRye-kDCY3D1RTIf_5oX3YWGLSjHJG3u1uorNJ4hYYHWhZQLcMUFr-WiRZlaHuxGA-e0WE-LafVJu1CeFJUF6HOWfxbFuEVsiJqc1nBUf0IkYj1tKN5YseSmtRFNNzfeBCcL2SCljcFdylA3qPG__E2TQd_z2kPcJutT5eOExPjTKSR03MwHA?session=0&fife\" height=\"200\" width=\"auto\" /><br><br><br><br><img src=\"https://doc-0c-0s-mymaps.googleusercontent.com/untrusted/hostedimage/ltbtr56dsv8l0lhgq4hd7gmrfk/81hh02lfdf7ba0os2rr0hgsq5o/1697984447250/8AE0li_iM5vtQQwsLcDqdp-kpBjOzk1B/03630732761502837539/5AJ9UNGoPyAb5Oi5unni_SYoxvdswKcaOV_G--if-hMZJ3yxJJKhXc9TvgTnZVfKbsd2265J-HPBNb3sIxSg2wLuSnCUG1GEJ1HE2L6qKClkdlwL8k7H_4f3HDlAuiJSSBRC8FuL1JSxhk4leVLixDsQZa2JLFao9DJOTB0JA9J01wjw0BvJ6q2ABTgUk5pD0I6C68pUTVt-7kNPOUEZ0_ef-c_Riks4nOSTuPUN7EnXGVi9haEI?session=0&fife\" height=\"200\" width=\"auto\" />", "timestamp": null, "begin": null, "end": null, "altitudeMode": null, "tessellate": 1, "extrude": 0, "visibility": -1, "drawOrder": null, "icon": null,
// 				"gx_media_links": "https://doc-00-0s-mymaps.googleusercontent.com/untrusted/hostedimage/ltbtr56dsv8l0lhgq4hd7gmrfk/m6t8qadn34r07vunck8bd59m2c/1697984447250/8AE0li_iM5vtQQwsLcDqdp-kpBjOzk1B/03630732761502837539/5AJ9UNGoaldcLj0SVVtV215awH09VjxU16NUn1mnpdJLuFtm8sFWbsQsDHMjA5MGRye-kDCY3D1RTIf_5oX3YWGLSjHJG3u1uorNJ4hYYHWhZQLcMUFr-WiRZlaHuxGA-e0WE-LafVJu1CeFJUF6HOWfxbFuEVsiJqc1nBUf0IkYj1tKN5YseSmtRFNNzfeBCcL2SCljcFdylA3qPG__E2TQd_z2kPcJutT5eOExPjTKSR03MwHA?session=0&fife https://doc-0c-0s-mymaps.googleusercontent.com/untrusted/hostedimage/ltbtr56dsv8l0lhgq4hd7gmrfk/81hh02lfdf7ba0os2rr0hgsq5o/1697984447250/8AE0li_iM5vtQQwsLcDqdp-kpBjOzk1B/03630732761502837539/5AJ9UNGoPyAb5Oi5unni_SYoxvdswKcaOV_G--if-hMZJ3yxJJKhXc9TvgTnZVfKbsd2265J-HPBNb3sIxSg2wLuSnCUG1GEJ1HE2L6qKClkdlwL8k7H_4f3HDlAuiJSSBRC8FuL1JSxhk4leVLixDsQZa2JLFao9DJOTB0JA9J01wjw0BvJ6q2ABTgUk5pD0I6C68pUTVt-7kNPOUEZ0_ef-c_Riks4nOSTuPUN7EnXGVi9haEI?session=0&fife"
// 			},
// 			"geometry":
// 			{
// 				"type": "LineString", "coordinates":
// 					[
// 						[78.5756238, 25.4509414], [78.5776094, 25.4505333], [78.5774348, 25.4501845],
// 						[78.5774263, 25.4497737],
// 						[78.5773633, 25.449394],
// 						[78.5773347, 25.4490401], [78.5773318, 25.4487456], [78.5773519, 25.448451],
// 						[78.5774549, 25.4481204], [78.5775808, 25.447831]
// 					]
// 			}
// 		}
// 	]
// }
const parser = new DOMParser();
const kml = parser.parseFromString(kmlData, 'text/xml');
const enchrochmentKml = parser.parseFromString(enchrochmentData, 'text/xml');
const enchrochmentKmlWithMedia = parser.parseFromString(enchrochmentDataWithMedia, 'text/xml');
// let placemarks = enchrochmentKml.querySelectorAll("Placemark");
// for (let i = 0; i < placemarks.length; i++) {
// 	let score = placemarks[i].querySelector('SimpleData[name="Score"]');
// 	if (score !== null) {
// 		let scoreVal = score.innerHTML;
// 		if (parseInt(scoreVal) < 3) {
// 			console.log(parseInt(scoreVal));
// 			let colorDiv = placemarks[i].querySelector("color");
// 			colorDiv.innerHTML = "ff0000ff";
// 		} else {
// 			console.log(parseInt(scoreVal));
// 			let colorDiv = placemarks[i].querySelector("color");
// 			colorDiv.innerHTML = "ff00ff00";
// 		}
// 	}
// }

function MapComponent() {
	const [wardValue, setwardValue] = useState(1);
	const [scoreValue, setScoreValue] = useState("Any");
	const handleWardChange = (e) => {
		setwardValue(e.target.value);
	}

	const [parameter, setparameter] = useState("Cleaniness");
	const handleParameterChange = (e) => {
		setparameter(e.target.value);
	}

	const handleApplyClick = () => {

	}
	let max = -1;
	let min = 1;
	let filteredgeoJson = geojson.filter((json) => json.score > 0);
	let filteredData = data.filter((dat) => dat.geometry !== null);
	const newgeojson = [];
	for (let i = 0; i < filteredgeoJson.length; i++) {
		let json = filteredgeoJson[i];
		max = Math.max(max, json.score);
		min = Math.min(min, json.score);
		newgeojson.push(json);
	}

	let markerjson = newgeojson.filter((json) => json.score > 0.2);
	let middle = (min + max) / 2.0;

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		bgcolor: 'background.paper',
		p: 2,
		boxShadow: 24,
	};
	const [imgsrc, setImgsrc] = useState("");
	const [open, setOpen] = React.useState(false);
	const handleOpen = (e) => {
		setImgsrc(() => e.target.getAttribute('src'));
		setOpen(true);
	}
	const handleClose = () => setOpen(false);
	let position = [];
	wardDivision.features.map((feature) => {
		if (wardValue === feature.properties["Ward Numbe"]) {
			position = [feature.geometry.coordinates[0][0][0][1], feature.geometry.coordinates[0][0][0][0]];
		}
	})
	let selectedWardBoundary = [];

	wardDivision.features.map((ward) => {
		if (wardValue === ward.properties["Ward Numbe"]) {
			selectedWardBoundary = ward.geometry.coordinates;
		}
	});
	

	markerjson = markerjson.filter((dat) => {
		console.log(dat);
		let isTrue = isMarkerInsidePolygon([dat.longitude,dat.latitude],selectedWardBoundary);
		console.log(isTrue);
		return isTrue;
	});
	console.log(filteredgeoJson);
	return (
		<div className='mb-2 p-2 flex flex-col shadow-md rounded-lg'>
			<div className='flex p-2 items-center justify-between'>
				<div className='sm:flex sm:space-x-4 space-y-2 sm:space-y-0'>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Ward</InputLabel>
							<Select
								value={wardValue}
								label="Ward"
								onChange={handleWardChange}
							>
								{wards.map((ward) => {
									return (<MenuItem value={ward.ward_number}>{ward.ward_name}</MenuItem>)
								})}
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Parameter</InputLabel>
							<Select
								value={parameter}
								label="Parameter"
								onChange={handleParameterChange}
							>
								<MenuItem value={"Cleaniness"}>Cleaniness</MenuItem>
								<MenuItem value={"Tourism"}>Tourism</MenuItem>
								<MenuItem value={"Health"}>Health</MenuItem>
							</Select>
						</FormControl>
					</Box>

					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Score</InputLabel>
							<Select
								value={scoreValue}
								label="Score"
								onChange={(e) => setScoreValue(e.target.value)}
							>
								<MenuItem value={"Any"}>Any</MenuItem>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</div>
				{/* <div>
					<Button variant='contained' onClick={handleApplyClick} disableElevation>Apply</Button>
				</div> */}
			</div>
			<div>
				<MapContainer
					className='w-[100%] h-[600px]'
					center={position}
					zoom={14}
					scrollWheelZoom={false}
					key={position[0] + "$" + position[1]}
				>
					{/* {filteredData.map((ds, ix) => {
                        return (<GeoJSON data={ds} key={ix} />);
                    })} */}
					{/* <GeoJSON data={filteredData} style={setColor} pointToLayer={setIcon} /> */}
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>
					{/* <GeoJSON data={wardDivision} /> */}
					{wardDivision.features.map((feature) => {
						if (wardValue !== feature.properties["Ward Numbe"]) {
							return (<Polyline positions={feature.geometry.coordinates[0][0].map((cord) => [cord[1], cord[0]])} color={'purple'} />)
						}
					})}

					<Polygon positions={selectedWardBoundary[0][0].map((cord) => [cord[1], cord[0]])} color={'blue'} />
					{/* <ReactLeafletKml kml={kml} /> */}
					<ReactLeafletKml kml={enchrochmentKml} />
					<ReactLeafletKml kml={enchrochmentKmlWithMedia} />
					{
						markerjson.map((pos) => {
							return (
								<Marker position={[pos.latitude, pos.longitude]}
									eventHandlers={{
										mouseover: (event) => event.target.openPopup(),
									}} icon={redIcon}>
									<Popup>
										<p>Latitude:- {pos.latitude}</p>
										<p>Longitude:- {pos.longitude}</p>
										<p>Here is XYZ Information</p>
										<img src={`/images/${pos.filename}`} className='w-20 h-20' onClick={handleOpen} />
									</Popup>
								</Marker>
							)
						})
					}
					{/* <Polyline

						color={'blue'}
						positions={mediageoJSON.features[0].geometry.coordinates.map((dat) => [dat[1], dat[0]])}
					>
						<MapPopup vsrc={mediageoJSON.features[0].properties.gx_media_links} />
					</Polyline> */}
					{/* <HeatmapLayer
						radius={10}
						minOpacity={3}
						maxOpacity={3}
						fitBoundsOnLoad
						fitBoundsOnUpdate
						zoom={15}
						points={newgeojson}
						longitudeExtractor={m => parseFloat(m.longitude)}
						latitudeExtractor={m => parseFloat(m.latitude)}
						intensityExtractor={m => parseFloat(m.score)}
					/> */}
				</MapContainer>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<div className='flex items-center justify-between'>
							<h1 className='text-center'> Image </h1>
							<IconButton onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</div>
						<div>
							<ReactImageZoom zoomWidth={800} img={imgsrc} height={400} width={500} className='w-100 h-100 cursor-pointer' />
						</div>
					</Box>
				</Modal>
			</div>
		</div>
	)
}

export default MapComponent