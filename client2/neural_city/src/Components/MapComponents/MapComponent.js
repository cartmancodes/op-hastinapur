import React, { useState } from 'react'
import ReactImageZoom from 'react-image-zoom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import { geojson } from './heatmap';
import { useTheme } from '@mui/material/styles';
import SelectBox from '../Utility/SelectBox'
import { Button, IconButton } from '@mui/material';
import { Box, FormControl, InputLabel, Select, MenuItem, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { data } from './latlongPoints'
import { GeoJSON } from 'react-leaflet';
import L, { divIcon } from "leaflet";
import "./mapstyle.css";
// import wardLayer from './wardLayer.kml'
import ReactLeafletKml from "react-leaflet-kml";
// delete L.Icon.Default.prototype._getIconUrl;

const LeafIcon = L.Icon.extend({
	options: {}
});

const greenIcon = new LeafIcon({
	iconUrl:
		"greenMarker.png"
}),
	redIcon = new LeafIcon({
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
const setColor = ({ properties }) => {
	return { weight: 1 };
};

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

const parser = new DOMParser();
const kml = parser.parseFromString(kmlData, 'text/xml');
const enchrochmentKml = parser.parseFromString(enchrochmentData, 'text/xml');
let placemarks = enchrochmentKml.querySelectorAll("Placemark");
console.log(placemarks);
for (let i = 0; i < placemarks.length; i++) {
	let score = placemarks[i].querySelector('SimpleData[name="Score"]');
	if (score !== null) {
		let scoreVal = score.innerHTML;
		if (parseInt(scoreVal) < 3) {
			console.log(parseInt(scoreVal));
			let colorDiv = placemarks[i].querySelector("color");
			colorDiv.innerHTML = "ff0000ff";
		} else {
			console.log(parseInt(scoreVal));
			let colorDiv = placemarks[i].querySelector("color");
			colorDiv.innerHTML = "ff00ff00";
		}
	}
}
function MapComponent() {
	console.log(kml);
	console.log(enchrochmentKml)
	const position = [25.4492365, 78.5698204];
	const [wardValue, setwardValue] = useState("Ward1");
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
	const filteredgeoJson = geojson.filter((json) => json.score > 0);
	const filteredData = data.filter((dat) => dat.geometry !== null);
	const newgeojson = [];
	for (let i = 0; i < filteredgeoJson.length; i++) {
		let json = filteredgeoJson[i];
		max = Math.max(max, json.score);
		min = Math.min(min, json.score);
		newgeojson.push(json);
	}

	const markerjson = newgeojson.filter((json) => json.score > 0.2);
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
	return (
		<div className='mb-2 p-2 flex flex-col shadow-md rounded-lg'>
			<div className='flex p-2 items-center justify-between'>
				<div className='flex space-x-4'>
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Ward</InputLabel>
							<Select
								value={wardValue}
								label="Ward"
								onChange={handleWardChange}
							>
								<MenuItem value={"Ward1"}>Ward1</MenuItem>
								<MenuItem value={"Ward2"}>Ward2</MenuItem>
								<MenuItem value={"Ward3"}>Ward3</MenuItem>
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
					

				</div>
				<div>
					<Button variant='contained' onClick={handleApplyClick} disableElevation>Apply</Button>
				</div>
			</div>
			<div>
				<MapContainer
					className='w-[100%] h-[400px]'
					center={position}
					zoom={14}
					scrollWheelZoom={false}
				>
					{/* {filteredData.map((ds, ix) => {
                        return (<GeoJSON data={ds} key={ix} />);
                    })} */}
					{/* <GeoJSON data={filteredData} style={setColor} pointToLayer={setIcon} /> */}
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>
					<ReactLeafletKml kml={kml} />
					<ReactLeafletKml kml={enchrochmentKml}/>
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
					<HeatmapLayer
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
					/>
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