import videoJs from 'video.js'
import net from 'net'

const createCamera = () => {
  navigator.getUserMedia(
    {video: true, audio: true},
    (localMediaStream) => {
      const video = document.querySelector('video')
      video.src = window.URL.createObjectURL(localMediaStream)
      video.onloadedmetadata = (e) => {
        const player = videoJs('my-player')
        player.play()
      }
    },
    (e) => {
      console.error('Error getting user media', e)
    }
  )
}

const joinBuffers = (buffer1, buffer2) => {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength)
  tmp.set(new Uint8Array(buffer1), 0)
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength)
  return tmp.buffer
}

const createUI = (sender, reciever, voiceSender, voiceReciever) => {
  // createCamera()

  const image = document.getElementById('image')
  const heheh = JSON.parse(
    '{"0":137,"1":80,"2":78,"3":71,"4":13,"5":10,"6":26,"7":10,"8":0,"9":0,"10":0,"11":13,"12":73,"13":72,"14":68,"15":82,"16":0,"17":0,"18":0,"19":45,"20":0,"21":0,"22":0,"23":32,"24":8,"25":6,"26":0,"27":0,"28":0,"29":134,"30":132,"31":241,"32":68,"33":0,"34":0,"35":0,"36":4,"37":103,"38":65,"39":77,"40":65,"41":0,"42":0,"43":177,"44":143,"45":11,"46":252,"47":97,"48":5,"49":0,"50":0,"51":7,"52":56,"53":73,"54":68,"55":65,"56":84,"57":88,"58":9,"59":205,"60":88,"61":11,"62":112,"63":92,"64":85,"65":25,"66":254,"67":255,"68":115,"69":179,"70":129,"71":148,"72":36,"73":155,"74":190,"75":147,"76":187,"77":91,"78":228,"79":49,"80":64,"81":25,"82":99,"83":181,"84":105,"85":169,"86":117,"87":176,"88":149,"89":34,"90":99,"91":113,"92":80,"93":65,"94":165,"95":162,"96":118,"97":168,"98":15,"99":44,"100":3,"101":42,"102":99,"103":55,"104":125,"105":8,"106":29,"107":59,"108":221,"109":90,"110":29,"111":132,"112":38,"113":187,"114":43,"115":56,"116":162,"117":22,"118":5,"119":161,"120":206,"121":240,"122":24,"123":64,"124":40,"125":130,"126":15,"127":156,"128":138,"129":226,"130":3,"131":147,"132":14,"133":118,"134":74,"135":219,"136":41,"137":157,"138":102,"139":138,"140":238,"141":166,"142":155,"143":180,"144":105,"145":246,"146":238,"147":210,"148":144,"149":108,"150":238,"151":158,"152":223,"153":239,"154":44,"155":189,"156":233,"157":110,"158":186,"159":217,"160":172,"161":54,"162":64,"163":239,"164":204,"165":206,"166":61,"167":143,"168":255,"169":241,"170":157,"171":255,"172":156,"173":255,"174":251,"175":207,"176":93,"177":166,"178":183,"179":243,"180":185,"181":185,"182":211,"183":55,"184":125,"185":246,"186":69,"187":239,"188":177,"189":136,"190":166,"191":176,"192":150,"193":92,"194":86,"195":185,"196":201,"197":190,"198":244,"199":238,"200":30,"201":10,"202":47,"203":113,"204":79,"205":199,"206":45,"207":159,"208":142,"209":114,"210":41,"211":221,"212":192,"213":93,"214":125,"215":65,"216":62,"217":203,"218":183,"219":92,"220":136,"221":174,"222":99,"223":226,"224":185,"225":144,"226":57,"227":171,"228":80,"229":14,"230":227,"231":57,"232":22,"233":249,"234":155,"235":102,"236":218,"237":46,"238":110,"239":238,"240":177,"241":195,"242":107,"243":38,"244":191,"245":94,"246":56,"247":95,"248":73,"249":123,"250":194,"251":64,"252":207,"253":220,"254":146,"255":156,"256":81,"257":229,"258":171,"259":217,"260":196,"261":164,"262":110,"263":130,"264":99,"265":31,"266":145,"267":116,"268":144,"269":208,"270":14,"271":210,"272":178,"273":155,"274":20,"275":245,"276":137,"277":102,"278":75,"279":20,"280":53,"281":50,"282":211,"283":249,"284":36,"285":124,"286":53,"287":49,"288":205,"289":133,"290":115,"291":87,"292":72,"293":111,"294":29,"295":146,"296":236,"297":247,"298":142,"299":134,"300":166,"301":31,"302":174,"303":4,"304":176,"305":145,"306":153,"307":16,"308":208,"309":118,"310":52,"311":213,"312":194,"313":108,"314":61,"315":13,"316":144,"317":141,"318":48,"319":248,"320":184,"321":43,"322":58,"323":150,"324":108,"325":245,"326":255,"327":179,"328":28,"329":8,"330":187,"331":189,"332":111,"333":150,"334":178,"335":170,"336":215,"337":65,"338":231,"339":102,"340":44,"341":240,"342":77,"343":33,"344":89,"345":158,"346":8,"347":249,"348":127,"349":83,"350":78,"351":199,"352":155,"353":59,"354":109,"355":208,"356":118,"357":44,"358":117,"359":131,"360":18,"361":235,"362":1,"363":56,"364":62,"365":60,"366":236,"367":186,"368":215,"369":246,"370":172,"371":157,"372":242,"373":170,"374":103,"375":188,"376":146,"377":247,"378":204,"379":104,"380":234,"381":2,"382":31,"383":169,"384":71,"385":133,"386":184,"387":69,"388":88,"389":110,"390":239,"391":94,"392":85,"393":191,"394":101,"395":60,"396":61,"397":53,"398":158,"399":64,"400":185,"401":249,"402":96,"403":123,"404":230,"405":179,"406":138,"407":172,"408":71,"409":132,"410":233,"411":31,"412":242,"413":38,"414":45,"415":248,"416":95,"417":1,"418":27,"419":219,"420":61,"421":161,"422":134,"423":174,"424":184,"425":211,"426":183,"427":8,"428":199,"429":230,"430":17,"431":69,"432":124,"433":119,"434":32,"435":146,"436":254,"437":82,"438":57,"439":159,"440":102,"441":110,"442":252,"443":72,"444":131,"445":1,"446":154,"447":102,"448":95,"449":188,"450":80,"451":177,"452":156,"453":39,"454":204,"455":206,"456":176,"457":150,"458":189,"459":71,"460":90,"461":253,"462":7,"463":103,"464":124,"465":191,"466":103,"467":134,"468":111,"469":82,"470":141,"471":137,"472":234,"473":129,"474":132,"475":179,"476":115,"477":241,"478":233,"479":50,"480":2,"481":133,"482":119,"483":84,"484":5,"485":253,"486":243,"487":159,"488":133,"489":189,"490":37,"491":196,"492":122,"493":113,"494":124,"495":149,"496":255,"497":101,"498":3,"499":176,"500":212,"501":83,"502":22,"503":180,"504":29,"505":73,"506":127,"507":69,"508":49,"509":181,"510":17,"511":243,"512":148,"513":66,"514":101,"515":48,"516":192,"517":43,"518":96,"519":128,"520":55,"521":176,"522":136,"523":121,"524":156,"525":213,"526":31,"527":136,"528":175,"529":243,"530":31,"531":40,"532":156,"533":255,"534":127,"535":219,"536":83,"537":194,"538":125,"539":245,"540":53,"541":254,"542":234,"543":87,"544":25,"545":71,"546":45,"547":30,"548":170,"549":95,"550":8,"551":59,"552":112,"553":117,"554":234,"555":83,"556":250,"557":120,"558":132,"559":247,"560":84,"561":7,"562":162,"563":233,"564":231,"565":148,"566":226,"567":95,"568":0,"569":216,"570":78,"571":202,"572":233,"573":27,"574":93,"575":157,"576":109,"577":214,"578":57,"579":183,"580":69,"581":139,"582":172,"583":36,"584":145,"585":73,"586":88,"587":200,"588":34,"589":209,"590":180,"591":118,"592":162,"593":0,"594":27,"595":104,"596":199,"597":194,"598":83,"599":211,"600":154,"601":244,"602":29,"603":176,"604":189,"605":192,"606":142,"607":56,"608":55,"609":156,"610":10,"611":183,"612":204,"613":136,"614":29,"615":75,"616":223,"617":25,"618":136,"619":101,"620":116,"621":48,"622":150,"623":94,"624":89,"625":82,"626":108,"627":217,"628":99,"629":86,"630":32,"631":146,"632":185,"633":133,"634":194,"635":225,"636":210,"637":139,"638":46,"639":169,"640":84,"641":241,"642":32,"643":7,"644":98,"645":233,"646":125,"647":240,"648":255,"649":66,"650":197,"651":26,"652":134,"653":190,"654":2,"655":209,"656":76,"657":206,"658":142,"659":100,"660":126,"661":88,"662":177,"663":210,"664":4,"665":11,"666":6,"667":34,"668":206,"669":102,"670":96,"671":24,"672":174,"673":143,"674":56,"675":69,"676":199,"677":210,"678":115,"679":115,"680":74,"681":164,"682":80,"683":28,"684":150,"685":35,"686":61,"687":121,"688":128,"689":221,"690":141,"691":158,"692":208,"693":59,"694":253,"695":102,"696":69,"697":207,"698":130,"699":77,"700":170,"701":106,"702":21,"703":127,"704":184,"705":148,"706":239,"707":83,"708":64,"709":67,"710":232,"711":82,"712":156,"713":255,"714":253,"715":169,"716":208,"717":228,"718":84,"719":41,"720":133,"721":119,"722":98,"723":204,"724":29,"725":80,"726":93,"727":121,"728":63,"729":154,"730":131,"731":165,"732":252,"733":149,"734":2,"735":237,"736":162,"737":204,"738":14,"739":148,"740":18,"741":30,"742":61,"743":54,"744":61,"745":220,"746":91,"747":27,"748":220,"749":114,"750":108,"751":206,"752":180,"753":187,"754":142,"755":212,"756":141,"757":158,"758":27,"759":171,"760":111,"761":116,"762":102,"763":110,"764":57,"765":214,"766":76,"767":183,"768":29,"769":40,"770":186,"771":147,"772":20,"773":202,"774":39,"775":215,"776":215,"777":29,"778":5,"779":111,"780":100,"781":153,"782":181,"783":93,"784":56,"785":238,"786":181,"787":139,"788":40,"789":207,"790":14,"791":119,"792":79,"793":82,"794":254,"795":218,"796":231,"797":193,"798":24,"799":243,"800":19,"801":123,"802":247,"803":55,"804":208,"805":207,"806":230,"807":15,"808":123,"809":130,"810":133,"811":111,"812":156,"813":251,"814":171,"815":80,"816":182,"817":219,"818":97,"819":184,"820":25,"821":219,"822":168,"823":192,"824":75,"825":40,"826":102,"827":242,"828":116,"829":142,"830":120,"831":253,"832":225,"833":80,"834":221,"835":190,"836":66,"837":89,"838":175,"839":221,"840":24,"841":201,"842":124,"843":196,"844":82,"845":116,"846":15,"847":250,"848":239,"849":131,"850":83,"851":227,"852":119,"853":24,"854":165,"855":251,"856":101,"857":202,"858":229,"859":190,"860":153,"861":88,"862":61,"863":121,"864":151,"865":39,"866":231,"867":189,"868":131,"869":177,"870":76,"871":22,"872":44,"873":245,"874":58,"875":216,"876":228,"877":214,"878":238,"879":80,"880":67,"881":81,"882":82,"883":142,"884":68,"885":26,"886":209,"887":178,"888":85,"889":67,"890":109,"891":7,"892":0,"893":95,"894":14,"895":48,"896":63,"897":32,"898":59,"899":83,"900":146,"901":35,"902":81,"903":177,"904":214,"905":3,"906":240,"907":239,"908":141,"909":113,"910":83,"911":118,"912":41,"913":71,"914":215,"915":163,"916":117,"917":39,"918":186,"919":75,"920":192,"921":233,"922":157,"923":200,"924":250,"925":101,"926":158,"927":99,"928":239,"929":141,"930":164,"931":218,"932":0,"933":192,"934":59,"935":192,"936":191,"937":85,"938":34,"939":178,"940":206,"941":232,"942":136,"943":208,"944":102,"945":96,"946":63,"947":151,"948":173,"949":170,"950":14,"951":208,"952":219,"953":231,"954":61,"955":89,"956":239,"957":173,"958":181,"959":44,"960":3,"961":128,"962":156,"963":98,"964":235,"965":15,"966":129,"967":168,"968":243,"969":99,"970":111,"971":220,"972":188,"973":223,"974":138,"975":180,"976":225,"977":101,"978":255,"979":172,"980":63,"981":33,"982":106,"983":239,"984":117,"985":53,"986":127,"987":42,"988":217,"989":90,"990":247,"991":98,"992":161,"993":144,"994":215,"995":14,"996":198,"997":156,"998":15,"999":10,"1000":169,"1001":191,"1002":34,"1003":2,"1004":219,"1005":18,"1006":251,"1007":94,"1008":91,"1009":89,"1010":184,"1011":19,"1012":111,"1013":221,"1014":242,"1015":38,"1016":61,"1017":1,"1018":147,"1019":151,"1020":67,"1021":254,"1022":214,"1023":196,"1024":170,"1025":186,"1026":159,"1027":26,"1028":189,"1029":96,"1030":212,"1031":249,"1032":56,"1033":177,"1034":122,"1035":14,"1036":96,"1037":31,"1038":76,"1039":116,"1040":245,"1041":220,"1042":66,"1043":247,"1044":94,"1045":52,"1046":228,"1047":217,"1048":203,"1049":23,"1050":147,"1051":134,"1052":234,"1053":95,"1054":99,"1055":151,"1056":90,"1057":36,"1058":59,"1059":220,"1060":156,"1061":248,"1062":246,"1063":212,"1064":184,"1065":55,"1066":151,"1067":127,"1068":163,"1069":26,"1070":7,"1071":46,"1072":189,"1073":120,"1074":19,"1075":51,"1076":223,"1077":1,"1078":253,"1079":72,"1080":34,"1081":84,"1082":191,"1083":218,"1084":140,"1085":231,"1086":35,"1087":29,"1088":104,"1089":152,"1090":181,"1091":17,"1092":132,"1093":190,"1094":80,"1095":107,"1096":90,"1097":49,"1098":22,"1099":224,"1100":188,"1101":17,"1102":225,"1103":219,"1104":241,"1105":78,"1106":136,"1107":243,"1108":198,"1109":215,"1110":11,"1111":1,"1112":155,"1113":185,"1114":158,"1115":181,"1116":141,"1117":189,"1118":137,"1119":131,"1120":61,"1121":87,"1122":97,"1123":65,"1124":219,"1125":209,"1126":189,"1127":47,"1128":16,"1129":115,"1130":86,"1131":152,"1132":113,"1133":61,"1134":148,"1135":219,"1136":35,"1137":90,"1138":183,"1139":38,"1140":156,"1141":200,"1142":77,"1143":133,"1144":128,"1145":205,"1146":156,"1147":41,"1148":38,"1149":52,"1150":148,"1151":133,"1152":28,"1153":87,"1154":115,"1155":181,"1156":239,"1157":54,"1158":51,"1159":86,"1160":244,"1161":224,"1162":120,"1163":2,"1164":232,"1165":122,"1166":216,"1167":108,"1168":3,"1169":240,"1170":214,"1171":145,"1172":93,"1173":52,"1174":231,"1175":56,"1176":24,"1177":77,"1178":247,"1179":227,"1180":12,"1181":253,"1182":170,"1183":72,"1184":161,"1185":68,"1186":7,"1187":74,"1188":255,"1189":65,"1190":193,"1191":185,"1192":191,"1193":196,"1194":212,"1195":201,"1196":33,"1197":36,"1198":24,"1199":170,"1200":233,"1201":95,"1202":32,"1203":171,"1204":177,"1205":237,"1206":155,"1207":78,"1208":78,"1209":140,"1210":221,"1211":130,"1212":255,"1213":63,"1214":227,"1215":8,"1216":253,"1217":113,"1218":108,"1219":9,"1220":66,"1221":193,"1222":201,"1223":236,"1224":2,"1225":198,"1226":221,"1227":144,"1228":97,"1229":197,"1230":254,"1231":218,"1232":207,"1233":33,"1234":202,"1235":13,"1236":174,"1237":214,"1238":227,"1239":21,"1240":19,"1241":102,"1242":161,"1243":169,"1244":154,"1245":232,"1246":72,"1247":25,"1248":227,"1249":100,"1250":162,"1251":153,"1252":17,"1253":185,"1254":22,"1255":50,"1256":199,"1257":89,"1258":169,"1259":13,"1260":193,"1261":104,"1262":230,"1263":138,"1264":178,"1265":242,"1266":102,"1267":146,"1268":233,"1269":40,"1270":126,"1271":211,"1272":202,"1273":200,"1274":33,"1275":103,"1276":77,"1277":14,"1278":80,"1279":115,"1280":83,"1281":196,"1282":89,"1283":138,"1284":219,"1285":32,"1286":205,"1287":65,"1288":34,"1289":165,"1290":199,"1291":187,"1292":180,"1293":67,"1294":65,"1295":144,"1296":120,"1297":187,"1298":80,"1299":119,"1300":46,"1301":43,"1302":99,"1303":156,"1304":204,"1305":206,"1306":165,"1307":91,"1308":253,"1309":199,"1310":40,"1311":39,"1312":243,"1313":144,"1314":48,"1315":73,"1316":168,"1317":61,"1318":101,"1319":183,"1320":247,"1321":207,"1322":45,"1323":163,"1324":131,"1325":88,"1326":240,"1327":60,"1328":88,"1329":127,"1330":165,"1331":140,"1332":12,"1333":37,"1334":186,"1335":146,"1336":219,"1337":145,"1338":188,"1339":90,"1340":177,"1341":154,"1342":167,"1343":176,"1344":130,"1345":11,"1346":161,"1347":116,"1348":176,"1349":156,"1350":194,"1351":200,"1352":156,"1353":208,"1354":51,"1355":0,"1356":242,"1357":81,"1358":59,"1359":146,"1360":250,"1361":216,"1362":200,"1363":88,"1364":65,"1365":195,"1366":142,"1367":58,"1368":95,"1369":96,"1370":127,"1371":157,"1372":19,"1373":104,"1374":239,"1375":127,"1376":127,"1377":98,"1378":117,"1379":253,"1380":107,"1381":50,"1382":148,"1383":93,"1384":128,"1385":160,"1386":244,"1387":43,"1388":101,"1389":189,"1390":208,"1391":20,"1392":203,"1393":44,"1394":46,"1395":16,"1396":29,"1397":105,"1398":226,"1399":8,"1400":125,"1401":3,"1402":54,"1403":207,"1404":101,"1405":205,"1406":38,"1407":23,"1408":198,"1409":126,"1410":176,"1411":131,"1412":96,"1413":159,"1414":67,"1415":8,"1416":194,"1417":37,"1418":96,"1419":41,"1420":192,"1421":6,"1422":234,"1423":177,"1424":165,"1425":79,"1426":206,"1427":128,"1428":49,"1429":218,"1430":176,"1431":218,"1432":127,"1433":41,"1434":165,"1435":30,"1436":183,"1437":163,"1438":233,"1439":175,"1440":121,"1441":5,"1442":194,"1443":20,"1444":12,"1445":115,"1446":95,"1447":96,"1448":86,"1449":15,"1450":67,"1451":250,"1452":165,"1453":196,"1454":254,"1455":131,"1456":123,"1457":141,"1458":150,"1459":97,"1460":3,"1461":87,"1462":114,"1463":87,"1464":226,"1465":35,"1466":161,"1467":215,"1468":18,"1469":2,"1470":117,"1471":101,"1472":54,"1473":128,"1474":101,"1475":206,"1476":49,"1477":115,"1478":121,"1479":29,"1480":244,"1481":97,"1482":43,"1483":130,"1484":40,"1485":63,"1486":25,"1487":95,"1488":93,"1489":7,"1490":230,"1491":41,"1492":255,"1493":128,"1494":142,"1495":29,"1496":72,"1497":248,"1498":193,"1499":30,"1500":28,"1501":199,"1502":10,"1503":206,"1504":171,"1505":232,"1506":198,"1507":134,"1508":108,"1509":30,"1510":202,"1511":14,"1512":94,"1513":3,"1514":254,"1515":124,"1516":73,"1517":49,"1518":111,"1519":13,"1520":94,"1521":216,"1522":152,"1523":65,"1524":210,"1525":29,"1526":170,"1527":246,"1528":215,"1529":56,"1530":56,"1531":191,"1532":223,"1533":1,"1534":87,"1535":108,"1536":117,"1537":221,"1538":227,"1539":159,"1540":40,"1541":100,"1542":150,"1543":100,"1544":104,"1545":242,"1546":161,"1547":129,"1548":65,"1549":119,"1550":33,"1551":34,"1552":243,"1553":12,"1554":40,"1555":245,"1556":187,"1557":62,"1558":223,"1559":57,"1560":253,"1561":35,"1562":58,"1563":232,"1564":35,"1565":102,"1566":15,"1567":13,"1568":102,"1569":135,"1570":190,"1571":92,"1572":30,"1573":238,"1574":137,"1575":89,"1576":145,"1577":89,"1578":196,"1579":210,"1580":205,"1581":72,"1582":148,"1583":207,"1584":32,"1585":206,"1586":79,"1587":184,"1588":154,"1589":174,"1590":40,"1591":75,"1592":119,"1593":163,"1594":172,"1595":230,"1596":171,"1597":34,"1598":89,"1599":31,"1600":130,"1601":211,"1602":11,"1603":176,"1604":136,"1605":125,"1606":58,"1607":39,"1608":59,"1609":146,"1610":107,"1611":252,"1612":29,"1613":163,"1614":196,"1615":138,"1616":186,"1617":141,"1618":109,"1619":206,"1620":101,"1621":86,"1622":21,"1623":95,"1624":135,"1625":157,"1626":13,"1627":32,"1628":250,"1629":123,"1630":80,"1631":64,"1632":94,"1633":172,"1634":32,"1635":151,"1636":242,"1637":54,"1638":154,"1639":34,"1640":169,"1641":249,"1642":150,"1643":178,"1644":58,"1645":68,"1646":244,"1647":10,"1648":54,"1649":137,"1650":195,"1651":13,"1652":181,"1653":255,"1654":102,"1655":225,"1656":206,"1657":120,"1658":168,"1659":238,"1660":234,"1661":34,"1662":47,"1663":103,"1664":80,"1665":7,"1666":193,"1667":221,"1668":134,"1669":133,"1670":126,"1671":250,"1672":184,"1673":184,"1674":1,"1675":213,"1676":29,"1677":182,"1678":7,"1679":240,"1680":239,"1681":207,"1682":102,"1683":68,"1684":123,"1685":41,"1686":206,"1687":233,"1688":87,"1689":207,"1690":32,"1691":156,"1692":35,"1693":80,"1694":76,"1695":85,"1696":5,"1697":224,"1698":47,"1699":146,"1700":232,"1701":118,"1702":115,"1703":251,"1704":204,"1705":87,"1706":196,"1707":248,"1708":223,"1709":127,"1710":247,"1711":35,"1712":148,"1713":201,"1714":231,"1715":113,"1716":78,"1717":127,"1718":210,"1719":20,"1720":117,"1721":150,"1722":143,"1723":72,"1724":159,"1725":1,"1726":141,"1727":64,"1728":52,"1729":117,"1730":37,"1731":120,"1732":226,"1733":81,"1734":148,"1735":250,"1736":157,"1737":9,"1738":73,"1739":155,"1740":59,"1741":206,"1742":73,"1743":214,"1744":56,"1745":241,"1746":81,"1747":249,"1748":20,"1749":146,"1750":5,"1751":66,"1752":178,"1753":13,"1754":127,"1755":184,"1756":108,"1757":52,"1758":159,"1759":247,"1760":239,"1761":22,"1762":110,"1763":187,"1764":45,"1765":61,"1766":141,"1767":45,"1768":50,"1769":223,"1770":139,"1771":223,"1772":2,"1773":145,"1774":239,"1775":29,"1776":164,"1777":193,"1778":165,"1779":222,"1780":191,"1781":80,"1782":197,"1783":84,"1784":103,"1785":62,"1786":227,"1787":235,"1788":91,"1789":54,"1790":136,"1791":82,"1792":107,"1793":0,"1794":182,"1795":6,"1796":172,"1797":210,"1798":137,"1799":29,"1800":232,"1801":68,"1802":225,"1803":236,"1804":6,"1805":45,"1806":229,"1807":222,"1808":254,"1809":5,"1810":224,"1811":155,"1812":133,"1813":242,"1814":149,"1815":113,"1816":14,"1817":130,"1818":183,"1819":8,"1820":9,"1821":142,"1822":58,"1823":34,"1824":63,"1825":119,"1826":221,"1827":129,"1828":86,"1829":220,"1830":109,"1831":142,"1832":123,"1833":254,"1834":139,"1835":65,"1836":159,"1837":24,"1838":157,"1839":126,"1840":119,"1841":111,"1842":163,"1843":175,"1844":250,"1845":236,"1846":27,"1847":113,"1848":81,"1849":254,"1850":36,"1851":206,"1852":210,"1853":108,"1854":108,"1855":200,"1856":52,"1857":8,"1858":150,"1859":148,"1860":245,"1861":12,"1862":77,"1863":216,"1864":91,"1865":36,"1866":133,"1867":227,"1868":208,"1869":5,"1870":106,"1871":251,"1872":45,"1873":174,"1874":176,"1875":191,"1876":52,"1877":69,"1878":106,"1879":180,"1880":237,"1881":202,"1882":128,"1883":96,"1884":7,"1885":136,"1886":102,"1887":228,"1888":207,"1889":255,"1890":104,"1891":3,"1892":19,"1893":219,"1894":239,"1895":213,"1896":149,"1897":252,"1898":233,"1899":243,"1900":95,"1901":239,"1902":203,"1903":2,"1904":204,"1905":89,"1906":32,"1907":77,"1908":213,"1909":0,"1910":0,"1911":0,"1912":0,"1913":73,"1914":69,"1915":78,"1916":68,"1917":174,"1918":66,"1919":96,"1920":130}'
  )
  const hehe = new Uint8Array(Object.values(heheh))
  const blob = new Blob([hehe], {type: 'image/jpeg'})
  const urlCreator = window.URL || window.webkitURL
  console.log(heheh, hehe)
  const imageUrl = urlCreator.createObjectURL(blob)
  image.src = imageUrl

  reciever.on('connection', (conn) => {
    conn.on('data', (data) => {
      console.log('Received data', data)
      const image = document.getElementById('image')
      const hehe = new Uint8Array(data)
      const blob = new Blob([hehe], {type: 'image/jpeg'})
      const urlCreator = window.URL || window.webkitURL
      const imageUrl = urlCreator.createObjectURL(blob)
      image.src = imageUrl
      image.onerror = (err) => console.log('Error', err)
    })
  })


  voiceReciever.on('call', (callReciever) => {
    navigator.getUserMedia({video: false, audio: true}, (stream) => {
      callReciever.answer(stream) // Answer the call with an A/V stream.
      callReciever.on('stream', (remoteStream) => {
        const audio = document.querySelector('audio')
        audio.src = window.URL.createObjectURL(remoteStream)
        audio.onloadedmetadata = function(e) {
          console.log('now playing the audio')
          audio.play()
        }

      })
    }, (err) => {
      console.log('Failed to get local stream', err)
    })
  })


  let connection
  const send = document.querySelector('#send')
  send.addEventListener('click', () => {
    connection && connection.send('afoj')
    connection && connection.send('prefix')
  })
  const connect = document.querySelector('#connect')
  const server = net.createServer((socket) => {

    socket.write('Echo server\r\n')
    socket.on('data', (data) => {
      connection && connection.send(data)
    })
  })
  server.listen(1337, '127.0.0.1')

  connect.addEventListener('click', () => {
    console.log('Connecting...')
    connection = sender.connect(`${process.env.CONNECT_TO}_reciever_video`)
    navigator.getUserMedia({video: false, audio: true}, (stream) => {
      const call = voiceSender.call(`${process.env.CONNECT_TO}_reciever_voice`, stream)
      call.on('stream', (remoteStream) => {
      })
    }, (err) => {
      console.log('Failed to get local stream', err)
    })
    connection.on('open', () => {
      connection && connection.send('posielam data')
    })
  })
}

export default createUI
