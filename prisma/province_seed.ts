import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.province.createMany({
    data: [
      {
        id: "11",
        name: "ACEH",
      },
      {
        id: "12",
        name: "SUMATERA UTARA",
      },
      {
        id: "13",
        name: "SUMATERA BARAT",
      },
      {
        id: "14",
        name: "RIAU",
      },
      {
        id: "15",
        name: "JAMBI",
      },
      {
        id: "16",
        name: "SUMATERA SELATAN",
      },
      {
        id: "17",
        name: "BENGKULU",
      },
      {
        id: "18",
        name: "LAMPUNG",
      },
      {
        id: "19",
        name: "KEPULAUAN BANGKA BELITUNG",
      },
      {
        id: "21",
        name: "KEPULAUAN RIAU",
      },
      {
        id: "31",
        name: "DKI JAKARTA",
      },
      {
        id: "32",
        name: "JAWA BARAT",
      },
      {
        id: "33",
        name: "JAWA TENGAH",
      },
      {
        id: "34",
        name: "DAERAH ISTIMEWA YOGYAKARTA",
      },
      {
        id: "35",
        name: "JAWA TIMUR",
      },
      {
        id: "36",
        name: "BANTEN",
      },
      {
        id: "51",
        name: "BALI",
      },
      {
        id: "52",
        name: "NUSA TENGGARA BARAT",
      },
      {
        id: "53",
        name: "NUSA TENGGARA TIMUR",
      },
      {
        id: "61",
        name: "KALIMANTAN BARAT",
      },
      {
        id: "62",
        name: "KALIMANTAN TENGAH",
      },
      {
        id: "63",
        name: "KALIMANTAN SELATAN",
      },
      {
        id: "64",
        name: "KALIMANTAN TIMUR",
      },
      {
        id: "65",
        name: "KALIMANTAN UTARA",
      },
      {
        id: "71",
        name: "SULAWESI UTARA",
      },
      {
        id: "72",
        name: "SULAWESI TENGAH",
      },
      {
        id: "73",
        name: "SULAWESI SELATAN",
      },
      {
        id: "74",
        name: "SULAWESI TENGGARA",
      },
      {
        id: "75",
        name: "GORONTALO",
      },
      {
        id: "76",
        name: "SULAWESI BARAT",
      },
      {
        id: "81",
        name: "MALUKU",
      },
      {
        id: "82",
        name: "MALUKU UTARA",
      },
      {
        id: "91",
        name: "PAPUA",
      },
      {
        id: "92",
        name: "PAPUA BARAT",
      },
      {
        id: "93",
        name: "PAPUA SELATAN",
      },
      {
        id: "94",
        name: "PAPUA TENGAH",
      },
      {
        id: "95",
        name: "PAPUA PEGUNUNGAN",
      },
    ],
  });
  console.log("✅ Created Province");

  await prisma.city.createMany({
    data: [
      {
        id: "1101",
        name: "KAB. ACEH SELATAN",
        provinceId: "11",
      },
      {
        id: "1102",
        name: "KAB. ACEH TENGGARA",
        provinceId: "11",
      },
      {
        id: "1103",
        name: "KAB. ACEH TIMUR",
        provinceId: "11",
      },
      {
        id: "1104",
        name: "KAB. ACEH TENGAH",
        provinceId: "11",
      },
      {
        id: "1105",
        name: "KAB. ACEH BARAT",
        provinceId: "11",
      },
      {
        id: "1106",
        name: "KAB. ACEH BESAR",
        provinceId: "11",
      },
      {
        id: "1107",
        name: "KAB. PIDIE",
        provinceId: "11",
      },
      {
        id: "1108",
        name: "KAB. ACEH UTARA",
        provinceId: "11",
      },
      {
        id: "1109",
        name: "KAB. SIMEULUE",
        provinceId: "11",
      },
      {
        id: "1110",
        name: "KAB. ACEH SINGKIL",
        provinceId: "11",
      },
      {
        id: "1111",
        name: "KAB. BIREUEN",
        provinceId: "11",
      },
      {
        id: "1112",
        name: "KAB. ACEH BARAT DAYA",
        provinceId: "11",
      },
      {
        id: "1113",
        name: "KAB. GAYO LUES",
        provinceId: "11",
      },
      {
        id: "1114",
        name: "KAB. ACEH JAYA",
        provinceId: "11",
      },
      {
        id: "1115",
        name: "KAB. NAGAN RAYA",
        provinceId: "11",
      },
      {
        id: "1116",
        name: "KAB. ACEH TAMIANG",
        provinceId: "11",
      },
      {
        id: "1117",
        name: "KAB. BENER MERIAH",
        provinceId: "11",
      },
      {
        id: "1118",
        name: "KAB. PIDIE JAYA",
        provinceId: "11",
      },
      {
        id: "1171",
        name: "KOTA BANDA ACEH",
        provinceId: "11",
      },
      {
        id: "1172",
        name: "KOTA SABANG",
        provinceId: "11",
      },
      {
        id: "1173",
        name: "KOTA LHOKSEUMAWE",
        provinceId: "11",
      },
      {
        id: "1174",
        name: "KOTA LANGSA",
        provinceId: "11",
      },
      {
        id: "1175",
        name: "KOTA SUBULUSSALAM",
        provinceId: "11",
      },
      {
        id: "1201",
        name: "KAB. TAPANULI TENGAH",
        provinceId: "12",
      },
      {
        id: "1202",
        name: "KAB. TAPANULI UTARA",
        provinceId: "12",
      },
      {
        id: "1203",
        name: "KAB. TAPANULI SELATAN",
        provinceId: "12",
      },
      {
        id: "1204",
        name: "KAB. NIAS",
        provinceId: "12",
      },
      {
        id: "1205",
        name: "KAB. LANGKAT",
        provinceId: "12",
      },
      {
        id: "1206",
        name: "KAB. KARO",
        provinceId: "12",
      },
      {
        id: "1207",
        name: "KAB. DELI SERDANG",
        provinceId: "12",
      },
      {
        id: "1208",
        name: "KAB. SIMALUNGUN",
        provinceId: "12",
      },
      {
        id: "1209",
        name: "KAB. ASAHAN",
        provinceId: "12",
      },
      {
        id: "1210",
        name: "KAB. LABUHANBATU",
        provinceId: "12",
      },
      {
        id: "1211",
        name: "KAB. DAIRI",
        provinceId: "12",
      },
      {
        id: "1212",
        name: "KAB. TOBA",
        provinceId: "12",
      },
      {
        id: "1213",
        name: "KAB. MANDAILING NATAL",
        provinceId: "12",
      },
      {
        id: "1214",
        name: "KAB. NIAS SELATAN",
        provinceId: "12",
      },
      {
        id: "1215",
        name: "KAB. PAKPAK BHARAT",
        provinceId: "12",
      },
      {
        id: "1216",
        name: "KAB. HUMBANG HASUNDUTAN",
        provinceId: "12",
      },
      {
        id: "1217",
        name: "KAB. SAMOSIR",
        provinceId: "12",
      },
      {
        id: "1218",
        name: "KAB. SERDANG BEDAGAI",
        provinceId: "12",
      },
      {
        id: "1219",
        name: "KAB. BATU BARA",
        provinceId: "12",
      },
      {
        id: "1220",
        name: "KAB. PADANG LAWAS UTARA",
        provinceId: "12",
      },
      {
        id: "1221",
        name: "KAB. PADANG LAWAS",
        provinceId: "12",
      },
      {
        id: "1222",
        name: "KAB. LABUHANBATU SELATAN",
        provinceId: "12",
      },
      {
        id: "1223",
        name: "KAB. LABUHANBATU UTARA",
        provinceId: "12",
      },
      {
        id: "1224",
        name: "KAB. NIAS UTARA",
        provinceId: "12",
      },
      {
        id: "1225",
        name: "KAB. NIAS BARAT",
        provinceId: "12",
      },
      {
        id: "1271",
        name: "KOTA MEDAN",
        provinceId: "12",
      },
      {
        id: "1272",
        name: "KOTA PEMATANGSIANTAR",
        provinceId: "12",
      },
      {
        id: "1273",
        name: "KOTA SIBOLGA",
        provinceId: "12",
      },
      {
        id: "1274",
        name: "KOTA TANJUNG BALAI",
        provinceId: "12",
      },
      {
        id: "1275",
        name: "KOTA BINJAI",
        provinceId: "12",
      },
      {
        id: "1276",
        name: "KOTA TEBING TINGGI",
        provinceId: "12",
      },
      {
        id: "1277",
        name: "KOTA PADANGSIDIMPUAN",
        provinceId: "12",
      },
      {
        id: "1278",
        name: "KOTA GUNUNGSITOLI",
        provinceId: "12",
      },
      {
        id: "1301",
        name: "KAB. PESISIR SELATAN",
        provinceId: "13",
      },
      {
        id: "1302",
        name: "KAB. SOLOK",
        provinceId: "13",
      },
      {
        id: "1303",
        name: "KAB. SIJUNJUNG",
        provinceId: "13",
      },
      {
        id: "1304",
        name: "KAB. TANAH DATAR",
        provinceId: "13",
      },
      {
        id: "1305",
        name: "KAB. PADANG PARIAMAN",
        provinceId: "13",
      },
      {
        id: "1306",
        name: "KAB. AGAM",
        provinceId: "13",
      },
      {
        id: "1307",
        name: "KAB. LIMA PULUH KOTA",
        provinceId: "13",
      },
      {
        id: "1308",
        name: "KAB. PASAMAN",
        provinceId: "13",
      },
      {
        id: "1309",
        name: "KAB. KEPULAUAN MENTAWAI",
        provinceId: "13",
      },
      {
        id: "1310",
        name: "KAB. DHARMASRAYA",
        provinceId: "13",
      },
      {
        id: "1311",
        name: "KAB. SOLOK SELATAN",
        provinceId: "13",
      },
      {
        id: "1312",
        name: "KAB. PASAMAN BARAT",
        provinceId: "13",
      },
      {
        id: "1371",
        name: "KOTA PADANG",
        provinceId: "13",
      },
      {
        id: "1372",
        name: "KOTA SOLOK",
        provinceId: "13",
      },
      {
        id: "1373",
        name: "KOTA SAWAHLUNTO",
        provinceId: "13",
      },
      {
        id: "1374",
        name: "KOTA PADANG PANJANG",
        provinceId: "13",
      },
      {
        id: "1375",
        name: "KOTA BUKITTINGGI",
        provinceId: "13",
      },
      {
        id: "1376",
        name: "KOTA PAYAKUMBUH",
        provinceId: "13",
      },
      {
        id: "1377",
        name: "KOTA PARIAMAN",
        provinceId: "13",
      },
      {
        id: "1401",
        name: "KAB. KAMPAR",
        provinceId: "14",
      },
      {
        id: "1402",
        name: "KAB. INDRAGIRI HULU",
        provinceId: "14",
      },
      {
        id: "1403",
        name: "KAB. BENGKALIS",
        provinceId: "14",
      },
      {
        id: "1404",
        name: "KAB. INDRAGIRI HILIR",
        provinceId: "14",
      },
      {
        id: "1405",
        name: "KAB. PELALAWAN",
        provinceId: "14",
      },
      {
        id: "1406",
        name: "KAB. ROKAN HULU",
        provinceId: "14",
      },
      {
        id: "1407",
        name: "KAB. ROKAN HILIR",
        provinceId: "14",
      },
      {
        id: "1408",
        name: "KAB. SIAK",
        provinceId: "14",
      },
      {
        id: "1409",
        name: "KAB. KUANTAN SINGINGI",
        provinceId: "14",
      },
      {
        id: "1410",
        name: "KAB. KEPULAUAN MERANTI",
        provinceId: "14",
      },
      {
        id: "1471",
        name: "KOTA PEKANBARU",
        provinceId: "14",
      },
      {
        id: "1472",
        name: "KOTA DUMAI",
        provinceId: "14",
      },
      {
        id: "1501",
        name: "KAB. KERINCI",
        provinceId: "15",
      },
      {
        id: "1502",
        name: "KAB. MERANGIN",
        provinceId: "15",
      },
      {
        id: "1503",
        name: "KAB. SAROLANGUN",
        provinceId: "15",
      },
      {
        id: "1504",
        name: "KAB. BATANGHARI",
        provinceId: "15",
      },
      {
        id: "1505",
        name: "KAB. MUARO JAMBI",
        provinceId: "15",
      },
      {
        id: "1506",
        name: "KAB. TANJUNG JABUNG BARAT",
        provinceId: "15",
      },
      {
        id: "1507",
        name: "KAB. TANJUNG JABUNG TIMUR",
        provinceId: "15",
      },
      {
        id: "1508",
        name: "KAB. BUNGO",
        provinceId: "15",
      },
      {
        id: "1509",
        name: "KAB. TEBO",
        provinceId: "15",
      },
      {
        id: "1571",
        name: "KOTA JAMBI",
        provinceId: "15",
      },
      {
        id: "1572",
        name: "KOTA SUNGAI PENUH",
        provinceId: "15",
      },
      {
        id: "1601",
        name: "KAB. OGAN KOMERING ULU",
        provinceId: "16",
      },
      {
        id: "1602",
        name: "KAB. OGAN KOMERING ILIR",
        provinceId: "16",
      },
      {
        id: "1603",
        name: "KAB. MUARA ENIM",
        provinceId: "16",
      },
      {
        id: "1604",
        name: "KAB. LAHAT",
        provinceId: "16",
      },
      {
        id: "1605",
        name: "KAB. MUSI RAWAS",
        provinceId: "16",
      },
      {
        id: "1606",
        name: "KAB. MUSI BANYUASIN",
        provinceId: "16",
      },
      {
        id: "1607",
        name: "KAB. BANYUASIN",
        provinceId: "16",
      },
      {
        id: "1608",
        name: "KAB. OGAN KOMERING ULU TIMUR",
        provinceId: "16",
      },
      {
        id: "1609",
        name: "KAB. OGAN KOMERING ULU SELATAN",
        provinceId: "16",
      },
      {
        id: "1610",
        name: "KAB. OGAN ILIR",
        provinceId: "16",
      },
      {
        id: "1611",
        name: "KAB. EMPAT LAWANG",
        provinceId: "16",
      },
      {
        id: "1612",
        name: "KAB. PENUKAL ABAB LEMATANG ILIR",
        provinceId: "16",
      },
      {
        id: "1613",
        name: "KAB. MUSI RAWAS UTARA",
        provinceId: "16",
      },
      {
        id: "1671",
        name: "KOTA PALEMBANG",
        provinceId: "16",
      },
      {
        id: "1672",
        name: "KOTA PAGAR ALAM",
        provinceId: "16",
      },
      {
        id: "1673",
        name: "KOTA LUBUK LINGGAU",
        provinceId: "16",
      },
      {
        id: "1674",
        name: "KOTA PRABUMULIH",
        provinceId: "16",
      },
      {
        id: "1701",
        name: "KAB. BENGKULU SELATAN",
        provinceId: "17",
      },
      {
        id: "1702",
        name: "KAB. REJANG LEBONG",
        provinceId: "17",
      },
      {
        id: "1703",
        name: "KAB. BENGKULU UTARA",
        provinceId: "17",
      },
      {
        id: "1704",
        name: "KAB. KAUR",
        provinceId: "17",
      },
      {
        id: "1705",
        name: "KAB. SELUMA",
        provinceId: "17",
      },
      {
        id: "1706",
        name: "KAB. MUKO MUKO",
        provinceId: "17",
      },
      {
        id: "1707",
        name: "KAB. LEBONG",
        provinceId: "17",
      },
      {
        id: "1708",
        name: "KAB. KEPAHIANG",
        provinceId: "17",
      },
      {
        id: "1709",
        name: "KAB. BENGKULU TENGAH",
        provinceId: "17",
      },
      {
        id: "1771",
        name: "KOTA BENGKULU",
        provinceId: "17",
      },
      {
        id: "1801",
        name: "KAB. LAMPUNG SELATAN",
        provinceId: "18",
      },
      {
        id: "1802",
        name: "KAB. LAMPUNG TENGAH",
        provinceId: "18",
      },
      {
        id: "1803",
        name: "KAB. LAMPUNG UTARA",
        provinceId: "18",
      },
      {
        id: "1804",
        name: "KAB. LAMPUNG BARAT",
        provinceId: "18",
      },
      {
        id: "1805",
        name: "KAB. TULANG BAWANG",
        provinceId: "18",
      },
      {
        id: "1806",
        name: "KAB. TANGGAMUS",
        provinceId: "18",
      },
      {
        id: "1807",
        name: "KAB. LAMPUNG TIMUR",
        provinceId: "18",
      },
      {
        id: "1808",
        name: "KAB. WAY KANAN",
        provinceId: "18",
      },
      {
        id: "1809",
        name: "KAB. PESAWARAN",
        provinceId: "18",
      },
      {
        id: "1810",
        name: "KAB. PRINGSEWU",
        provinceId: "18",
      },
      {
        id: "1811",
        name: "KAB. MESUJI",
        provinceId: "18",
      },
      {
        id: "1812",
        name: "KAB. TULANG BAWANG BARAT",
        provinceId: "18",
      },
      {
        id: "1813",
        name: "KAB. PESISIR BARAT",
        provinceId: "18",
      },
      {
        id: "1871",
        name: "KOTA BANDAR LAMPUNG",
        provinceId: "18",
      },
      {
        id: "1872",
        name: "KOTA METRO",
        provinceId: "18",
      },
      {
        id: "1901",
        name: "KAB. BANGKA",
        provinceId: "19",
      },
      {
        id: "1902",
        name: "KAB. BELITUNG",
        provinceId: "19",
      },
      {
        id: "1903",
        name: "KAB. BANGKA SELATAN",
        provinceId: "19",
      },
      {
        id: "1904",
        name: "KAB. BANGKA TENGAH",
        provinceId: "19",
      },
      {
        id: "1905",
        name: "KAB. BANGKA BARAT",
        provinceId: "19",
      },
      {
        id: "1906",
        name: "KAB. BELITUNG TIMUR",
        provinceId: "19",
      },
      {
        id: "1971",
        name: "KOTA PANGKAL PINANG",
        provinceId: "19",
      },
      {
        id: "2101",
        name: "KAB. BINTAN",
        provinceId: "21",
      },
      {
        id: "2102",
        name: "KAB. KARIMUN",
        provinceId: "21",
      },
      {
        id: "2103",
        name: "KAB. NATUNA",
        provinceId: "21",
      },
      {
        id: "2104",
        name: "KAB. LINGGA",
        provinceId: "21",
      },
      {
        id: "2105",
        name: "KAB. KEPULAUAN ANAMBAS",
        provinceId: "21",
      },
      {
        id: "2171",
        name: "KOTA BATAM",
        provinceId: "21",
      },
      {
        id: "2172",
        name: "KOTA TANJUNG PINANG",
        provinceId: "21",
      },
      {
        id: "3101",
        name: "KAB. ADM. KEP. SERIBU",
        provinceId: "31",
      },
      {
        id: "3171",
        name: "KOTA ADM. JAKARTA PUSAT",
        provinceId: "31",
      },
      {
        id: "3172",
        name: "KOTA ADM. JAKARTA UTARA",
        provinceId: "31",
      },
      {
        id: "3173",
        name: "KOTA ADM. JAKARTA BARAT",
        provinceId: "31",
      },
      {
        id: "3174",
        name: "KOTA ADM. JAKARTA SELATAN",
        provinceId: "31",
      },
      {
        id: "3175",
        name: "KOTA ADM. JAKARTA TIMUR",
        provinceId: "31",
      },
      {
        id: "3201",
        name: "KAB. BOGOR",
        provinceId: "32",
      },
      {
        id: "3202",
        name: "KAB. SUKABUMI",
        provinceId: "32",
      },
      {
        id: "3203",
        name: "KAB. CIANJUR",
        provinceId: "32",
      },
      {
        id: "3204",
        name: "KAB. BANDUNG",
        provinceId: "32",
      },
      {
        id: "3205",
        name: "KAB. GARUT",
        provinceId: "32",
      },
      {
        id: "3206",
        name: "KAB. TASIKMALAYA",
        provinceId: "32",
      },
      {
        id: "3207",
        name: "KAB. CIAMIS",
        provinceId: "32",
      },
      {
        id: "3208",
        name: "KAB. KUNINGAN",
        provinceId: "32",
      },
      {
        id: "3209",
        name: "KAB. CIREBON",
        provinceId: "32",
      },
      {
        id: "3210",
        name: "KAB. MAJALENGKA",
        provinceId: "32",
      },
      {
        id: "3211",
        name: "KAB. SUMEDANG",
        provinceId: "32",
      },
      {
        id: "3212",
        name: "KAB. INDRAMAYU",
        provinceId: "32",
      },
      {
        id: "3213",
        name: "KAB. SUBANG",
        provinceId: "32",
      },
      {
        id: "3214",
        name: "KAB. PURWAKARTA",
        provinceId: "32",
      },
      {
        id: "3215",
        name: "KAB. KARAWANG",
        provinceId: "32",
      },
      {
        id: "3216",
        name: "KAB. BEKASI",
        provinceId: "32",
      },
      {
        id: "3217",
        name: "KAB. BANDUNG BARAT",
        provinceId: "32",
      },
      {
        id: "3218",
        name: "KAB. PANGANDARAN",
        provinceId: "32",
      },
      {
        id: "3271",
        name: "KOTA BOGOR",
        provinceId: "32",
      },
      {
        id: "3272",
        name: "KOTA SUKABUMI",
        provinceId: "32",
      },
      {
        id: "3273",
        name: "KOTA BANDUNG",
        provinceId: "32",
      },
      {
        id: "3274",
        name: "KOTA CIREBON",
        provinceId: "32",
      },
      {
        id: "3275",
        name: "KOTA BEKASI",
        provinceId: "32",
      },
      {
        id: "3276",
        name: "KOTA DEPOK",
        provinceId: "32",
      },
      {
        id: "3277",
        name: "KOTA CIMAHI",
        provinceId: "32",
      },
      {
        id: "3278",
        name: "KOTA TASIKMALAYA",
        provinceId: "32",
      },
      {
        id: "3279",
        name: "KOTA BANJAR",
        provinceId: "32",
      },
      {
        id: "3301",
        name: "KAB. CILACAP",
        provinceId: "33",
      },
      {
        id: "3302",
        name: "KAB. BANYUMAS",
        provinceId: "33",
      },
      {
        id: "3303",
        name: "KAB. PURBALINGGA",
        provinceId: "33",
      },
      {
        id: "3304",
        name: "KAB. BANJARNEGARA",
        provinceId: "33",
      },
      {
        id: "3305",
        name: "KAB. KEBUMEN",
        provinceId: "33",
      },
      {
        id: "3306",
        name: "KAB. PURWOREJO",
        provinceId: "33",
      },
      {
        id: "3307",
        name: "KAB. WONOSOBO",
        provinceId: "33",
      },
      {
        id: "3308",
        name: "KAB. MAGELANG",
        provinceId: "33",
      },
      {
        id: "3309",
        name: "KAB. BOYOLALI",
        provinceId: "33",
      },
      {
        id: "3310",
        name: "KAB. KLATEN",
        provinceId: "33",
      },
      {
        id: "3311",
        name: "KAB. SUKOHARJO",
        provinceId: "33",
      },
      {
        id: "3312",
        name: "KAB. WONOGIRI",
        provinceId: "33",
      },
      {
        id: "3313",
        name: "KAB. KARANGANYAR",
        provinceId: "33",
      },
      {
        id: "3314",
        name: "KAB. SRAGEN",
        provinceId: "33",
      },
      {
        id: "3315",
        name: "KAB. GROBOGAN",
        provinceId: "33",
      },
      {
        id: "3316",
        name: "KAB. BLORA",
        provinceId: "33",
      },
      {
        id: "3317",
        name: "KAB. REMBANG",
        provinceId: "33",
      },
      {
        id: "3318",
        name: "KAB. PATI",
        provinceId: "33",
      },
      {
        id: "3319",
        name: "KAB. KUDUS",
        provinceId: "33",
      },
      {
        id: "3320",
        name: "KAB. JEPARA",
        provinceId: "33",
      },
      {
        id: "3321",
        name: "KAB. DEMAK",
        provinceId: "33",
      },
      {
        id: "3322",
        name: "KAB. SEMARANG",
        provinceId: "33",
      },
      {
        id: "3323",
        name: "KAB. TEMANGGUNG",
        provinceId: "33",
      },
      {
        id: "3324",
        name: "KAB. KENDAL",
        provinceId: "33",
      },
      {
        id: "3325",
        name: "KAB. BATANG",
        provinceId: "33",
      },
      {
        id: "3326",
        name: "KAB. PEKALONGAN",
        provinceId: "33",
      },
      {
        id: "3327",
        name: "KAB. PEMALANG",
        provinceId: "33",
      },
      {
        id: "3328",
        name: "KAB. TEGAL",
        provinceId: "33",
      },
      {
        id: "3329",
        name: "KAB. BREBES",
        provinceId: "33",
      },
      {
        id: "3371",
        name: "KOTA MAGELANG",
        provinceId: "33",
      },
      {
        id: "3372",
        name: "KOTA SURAKARTA",
        provinceId: "33",
      },
      {
        id: "3373",
        name: "KOTA SALATIGA",
        provinceId: "33",
      },
      {
        id: "3374",
        name: "KOTA SEMARANG",
        provinceId: "33",
      },
      {
        id: "3375",
        name: "KOTA PEKALONGAN",
        provinceId: "33",
      },
      {
        id: "3376",
        name: "KOTA TEGAL",
        provinceId: "33",
      },
      {
        id: "3401",
        name: "KAB. KULON PROGO",
        provinceId: "34",
      },
      {
        id: "3402",
        name: "KAB. BANTUL",
        provinceId: "34",
      },
      {
        id: "3403",
        name: "KAB. GUNUNGKIDUL",
        provinceId: "34",
      },
      {
        id: "3404",
        name: "KAB. SLEMAN",
        provinceId: "34",
      },
      {
        id: "3471",
        name: "KOTA YOGYAKARTA",
        provinceId: "34",
      },
      {
        id: "3501",
        name: "KAB. PACITAN",
        provinceId: "35",
      },
      {
        id: "3502",
        name: "KAB. PONOROGO",
        provinceId: "35",
      },
      {
        id: "3503",
        name: "KAB. TRENGGALEK",
        provinceId: "35",
      },
      {
        id: "3504",
        name: "KAB. TULUNGAGUNG",
        provinceId: "35",
      },
      {
        id: "3505",
        name: "KAB. BLITAR",
        provinceId: "35",
      },
      {
        id: "3506",
        name: "KAB. KEDIRI",
        provinceId: "35",
      },
      {
        id: "3507",
        name: "KAB. MALANG",
        provinceId: "35",
      },
      {
        id: "3508",
        name: "KAB. LUMAJANG",
        provinceId: "35",
      },
      {
        id: "3509",
        name: "KAB. JEMBER",
        provinceId: "35",
      },
      {
        id: "3510",
        name: "KAB. BANYUWANGI",
        provinceId: "35",
      },
      {
        id: "3511",
        name: "KAB. BONDOWOSO",
        provinceId: "35",
      },
      {
        id: "3512",
        name: "KAB. SITUBONDO",
        provinceId: "35",
      },
      {
        id: "3513",
        name: "KAB. PROBOLINGGO",
        provinceId: "35",
      },
      {
        id: "3514",
        name: "KAB. PASURUAN",
        provinceId: "35",
      },
      {
        id: "3515",
        name: "KAB. SIDOARJO",
        provinceId: "35",
      },
      {
        id: "3516",
        name: "KAB. MOJOKERTO",
        provinceId: "35",
      },
      {
        id: "3517",
        name: "KAB. JOMBANG",
        provinceId: "35",
      },
      {
        id: "3518",
        name: "KAB. NGANJUK",
        provinceId: "35",
      },
      {
        id: "3519",
        name: "KAB. MADIUN",
        provinceId: "35",
      },
      {
        id: "3520",
        name: "KAB. MAGETAN",
        provinceId: "35",
      },
      {
        id: "3521",
        name: "KAB. NGAWI",
        provinceId: "35",
      },
      {
        id: "3522",
        name: "KAB. BOJONEGORO",
        provinceId: "35",
      },
      {
        id: "3523",
        name: "KAB. TUBAN",
        provinceId: "35",
      },
      {
        id: "3524",
        name: "KAB. LAMONGAN",
        provinceId: "35",
      },
      {
        id: "3525",
        name: "KAB. GRESIK",
        provinceId: "35",
      },
      {
        id: "3526",
        name: "KAB. BANGKALAN",
        provinceId: "35",
      },
      {
        id: "3527",
        name: "KAB. SAMPANG",
        provinceId: "35",
      },
      {
        id: "3528",
        name: "KAB. PAMEKASAN",
        provinceId: "35",
      },
      {
        id: "3529",
        name: "KAB. SUMENEP",
        provinceId: "35",
      },
      {
        id: "3571",
        name: "KOTA KEDIRI",
        provinceId: "35",
      },
      {
        id: "3572",
        name: "KOTA BLITAR",
        provinceId: "35",
      },
      {
        id: "3573",
        name: "KOTA MALANG",
        provinceId: "35",
      },
      {
        id: "3574",
        name: "KOTA PROBOLINGGO",
        provinceId: "35",
      },
      {
        id: "3575",
        name: "KOTA PASURUAN",
        provinceId: "35",
      },
      {
        id: "3576",
        name: "KOTA MOJOKERTO",
        provinceId: "35",
      },
      {
        id: "3577",
        name: "KOTA MADIUN",
        provinceId: "35",
      },
      {
        id: "3578",
        name: "KOTA SURABAYA",
        provinceId: "35",
      },
      {
        id: "3579",
        name: "KOTA BATU",
        provinceId: "35",
      },
      {
        id: "3601",
        name: "KAB. PANDEGLANG",
        provinceId: "36",
      },
      {
        id: "3602",
        name: "KAB. LEBAK",
        provinceId: "36",
      },
      {
        id: "3603",
        name: "KAB. TANGERANG",
        provinceId: "36",
      },
      {
        id: "3604",
        name: "KAB. SERANG",
        provinceId: "36",
      },
      {
        id: "3671",
        name: "KOTA TANGERANG",
        provinceId: "36",
      },
      {
        id: "3672",
        name: "KOTA CILEGON",
        provinceId: "36",
      },
      {
        id: "3673",
        name: "KOTA SERANG",
        provinceId: "36",
      },
      {
        id: "3674",
        name: "KOTA TANGERANG SELATAN",
        provinceId: "36",
      },
      {
        id: "5101",
        name: "KAB. JEMBRANA",
        provinceId: "51",
      },
      {
        id: "5102",
        name: "KAB. TABANAN",
        provinceId: "51",
      },
      {
        id: "5103",
        name: "KAB. BADUNG",
        provinceId: "51",
      },
      {
        id: "5104",
        name: "KAB. GIANYAR",
        provinceId: "51",
      },
      {
        id: "5105",
        name: "KAB. KLUNGKUNG",
        provinceId: "51",
      },
      {
        id: "5106",
        name: "KAB. BANGLI",
        provinceId: "51",
      },
      {
        id: "5107",
        name: "KAB. KARANGASEM",
        provinceId: "51",
      },
      {
        id: "5108",
        name: "KAB. BULELENG",
        provinceId: "51",
      },
      {
        id: "5171",
        name: "KOTA DENPASAR",
        provinceId: "51",
      },
      {
        id: "5201",
        name: "KAB. LOMBOK BARAT",
        provinceId: "52",
      },
      {
        id: "5202",
        name: "KAB. LOMBOK TENGAH",
        provinceId: "52",
      },
      {
        id: "5203",
        name: "KAB. LOMBOK TIMUR",
        provinceId: "52",
      },
      {
        id: "5204",
        name: "KAB. SUMBAWA",
        provinceId: "52",
      },
      {
        id: "5205",
        name: "KAB. DOMPU",
        provinceId: "52",
      },
      {
        id: "5206",
        name: "KAB. BIMA",
        provinceId: "52",
      },
      {
        id: "5207",
        name: "KAB. SUMBAWA BARAT",
        provinceId: "52",
      },
      {
        id: "5208",
        name: "KAB. LOMBOK UTARA",
        provinceId: "52",
      },
      {
        id: "5271",
        name: "KOTA MATARAM",
        provinceId: "52",
      },
      {
        id: "5272",
        name: "KOTA BIMA",
        provinceId: "52",
      },
      {
        id: "5301",
        name: "KAB. KUPANG",
        provinceId: "53",
      },
      {
        id: "5302",
        name: "KAB TIMOR TENGAH SELATAN",
        provinceId: "53",
      },
      {
        id: "5303",
        name: "KAB. TIMOR TENGAH UTARA",
        provinceId: "53",
      },
      {
        id: "5304",
        name: "KAB. BELU",
        provinceId: "53",
      },
      {
        id: "5305",
        name: "KAB. ALOR",
        provinceId: "53",
      },
      {
        id: "5306",
        name: "KAB. FLORES TIMUR",
        provinceId: "53",
      },
      {
        id: "5307",
        name: "KAB. SIKKA",
        provinceId: "53",
      },
      {
        id: "5308",
        name: "KAB. ENDE",
        provinceId: "53",
      },
      {
        id: "5309",
        name: "KAB. NGADA",
        provinceId: "53",
      },
      {
        id: "5310",
        name: "KAB. MANGGARAI",
        provinceId: "53",
      },
      {
        id: "5311",
        name: "KAB. SUMBA TIMUR",
        provinceId: "53",
      },
      {
        id: "5312",
        name: "KAB. SUMBA BARAT",
        provinceId: "53",
      },
      {
        id: "5313",
        name: "KAB. LEMBATA",
        provinceId: "53",
      },
      {
        id: "5314",
        name: "KAB. ROTE NDAO",
        provinceId: "53",
      },
      {
        id: "5315",
        name: "KAB. MANGGARAI BARAT",
        provinceId: "53",
      },
      {
        id: "5316",
        name: "KAB. NAGEKEO",
        provinceId: "53",
      },
      {
        id: "5317",
        name: "KAB. SUMBA TENGAH",
        provinceId: "53",
      },
      {
        id: "5318",
        name: "KAB. SUMBA BARAT DAYA",
        provinceId: "53",
      },
      {
        id: "5319",
        name: "KAB. MANGGARAI TIMUR",
        provinceId: "53",
      },
      {
        id: "5320",
        name: "KAB. SABU RAIJUA",
        provinceId: "53",
      },
      {
        id: "5321",
        name: "KAB. MALAKA",
        provinceId: "53",
      },
      {
        id: "5371",
        name: "KOTA KUPANG",
        provinceId: "53",
      },
      {
        id: "6101",
        name: "KAB. SAMBAS",
        provinceId: "61",
      },
      {
        id: "6102",
        name: "KAB. MEMPAWAH",
        provinceId: "61",
      },
      {
        id: "6103",
        name: "KAB. SANGGAU",
        provinceId: "61",
      },
      {
        id: "6104",
        name: "KAB. KETAPANG",
        provinceId: "61",
      },
      {
        id: "6105",
        name: "KAB. SINTANG",
        provinceId: "61",
      },
      {
        id: "6106",
        name: "KAB. KAPUAS HULU",
        provinceId: "61",
      },
      {
        id: "6107",
        name: "KAB. BENGKAYANG",
        provinceId: "61",
      },
      {
        id: "6108",
        name: "KAB. LANDAK",
        provinceId: "61",
      },
      {
        id: "6109",
        name: "KAB. SEKADAU",
        provinceId: "61",
      },
      {
        id: "6110",
        name: "KAB. MELAWI",
        provinceId: "61",
      },
      {
        id: "6111",
        name: "KAB. KAYONG UTARA",
        provinceId: "61",
      },
      {
        id: "6112",
        name: "KAB. KUBU RAYA",
        provinceId: "61",
      },
      {
        id: "6171",
        name: "KOTA PONTIANAK",
        provinceId: "61",
      },
      {
        id: "6172",
        name: "KOTA SINGKAWANG",
        provinceId: "61",
      },
      {
        id: "6201",
        name: "KAB. KOTAWARINGIN BARAT",
        provinceId: "62",
      },
      {
        id: "6202",
        name: "KAB. KOTAWARINGIN TIMUR",
        provinceId: "62",
      },
      {
        id: "6203",
        name: "KAB. KAPUAS",
        provinceId: "62",
      },
      {
        id: "6204",
        name: "KAB. BARITO SELATAN",
        provinceId: "62",
      },
      {
        id: "6205",
        name: "KAB. BARITO UTARA",
        provinceId: "62",
      },
      {
        id: "6206",
        name: "KAB. KATINGAN",
        provinceId: "62",
      },
      {
        id: "6207",
        name: "KAB. SERUYAN",
        provinceId: "62",
      },
      {
        id: "6208",
        name: "KAB. SUKAMARA",
        provinceId: "62",
      },
      {
        id: "6209",
        name: "KAB. LAMANDAU",
        provinceId: "62",
      },
      {
        id: "6210",
        name: "KAB. GUNUNG MAS",
        provinceId: "62",
      },
      {
        id: "6211",
        name: "KAB. PULANG PISAU",
        provinceId: "62",
      },
      {
        id: "6212",
        name: "KAB. MURUNG RAYA",
        provinceId: "62",
      },
      {
        id: "6213",
        name: "KAB. BARITO TIMUR",
        provinceId: "62",
      },
      {
        id: "6271",
        name: "KOTA PALANGKARAYA",
        provinceId: "62",
      },
      {
        id: "6301",
        name: "KAB. TANAH LAUT",
        provinceId: "63",
      },
      {
        id: "6302",
        name: "KAB. KOTABARU",
        provinceId: "63",
      },
      {
        id: "6303",
        name: "KAB. BANJAR",
        provinceId: "63",
      },
      {
        id: "6304",
        name: "KAB. BARITO KUALA",
        provinceId: "63",
      },
      {
        id: "6305",
        name: "KAB. TAPIN",
        provinceId: "63",
      },
      {
        id: "6306",
        name: "KAB. HULU SUNGAI SELATAN",
        provinceId: "63",
      },
      {
        id: "6307",
        name: "KAB. HULU SUNGAI TENGAH",
        provinceId: "63",
      },
      {
        id: "6308",
        name: "KAB. HULU SUNGAI UTARA",
        provinceId: "63",
      },
      {
        id: "6309",
        name: "KAB. TABALONG",
        provinceId: "63",
      },
      {
        id: "6310",
        name: "KAB. TANAH BUMBU",
        provinceId: "63",
      },
      {
        id: "6311",
        name: "KAB. BALANGAN",
        provinceId: "63",
      },
      {
        id: "6371",
        name: "KOTA BANJARMASIN",
        provinceId: "63",
      },
      {
        id: "6372",
        name: "KOTA BANJARBARU",
        provinceId: "63",
      },
      {
        id: "6401",
        name: "KAB. PASER",
        provinceId: "64",
      },
      {
        id: "6402",
        name: "KAB. KUTAI KARTANEGARA",
        provinceId: "64",
      },
      {
        id: "6403",
        name: "KAB. BERAU",
        provinceId: "64",
      },
      {
        id: "6407",
        name: "KAB. KUTAI BARAT",
        provinceId: "64",
      },
      {
        id: "6408",
        name: "KAB. KUTAI TIMUR",
        provinceId: "64",
      },
      {
        id: "6409",
        name: "KAB. PENAJAM PASER UTARA",
        provinceId: "64",
      },
      {
        id: "6411",
        name: "KAB. MAHAKAM ULU",
        provinceId: "64",
      },
      {
        id: "6471",
        name: "KOTA BALIKPAPAN",
        provinceId: "64",
      },
      {
        id: "6472",
        name: "KOTA SAMARINDA",
        provinceId: "64",
      },
      {
        id: "6474",
        name: "KOTA BONTANG",
        provinceId: "64",
      },
      {
        id: "6501",
        name: "KAB. BULUNGAN",
        provinceId: "65",
      },
      {
        id: "6502",
        name: "KAB. MALINAU",
        provinceId: "65",
      },
      {
        id: "6503",
        name: "KAB. NUNUKAN",
        provinceId: "65",
      },
      {
        id: "6504",
        name: "KAB. TANA TIDUNG",
        provinceId: "65",
      },
      {
        id: "6571",
        name: "KOTA TARAKAN",
        provinceId: "65",
      },
      {
        id: "7101",
        name: "KAB. BOLAANG MONGONDOW",
        provinceId: "71",
      },
      {
        id: "7102",
        name: "KAB. MINAHASA",
        provinceId: "71",
      },
      {
        id: "7103",
        name: "KAB. KEPULAUAN SANGIHE",
        provinceId: "71",
      },
      {
        id: "7104",
        name: "KAB. KEPULAUAN TALAUD",
        provinceId: "71",
      },
      {
        id: "7105",
        name: "KAB. MINAHASA SELATAN",
        provinceId: "71",
      },
      {
        id: "7106",
        name: "KAB. MINAHASA UTARA",
        provinceId: "71",
      },
      {
        id: "7107",
        name: "KAB. MINAHASA TENGGARA",
        provinceId: "71",
      },
      {
        id: "7108",
        name: "KAB. BOLAANG MONGONDOW UTARA",
        provinceId: "71",
      },
      {
        id: "7109",
        name: "KAB. KEP. SIAU TAGULANDANG BIARO",
        provinceId: "71",
      },
      {
        id: "7110",
        name: "KAB. BOLAANG MONGONDOW TIMUR",
        provinceId: "71",
      },
      {
        id: "7111",
        name: "KAB. BOLAANG MONGONDOW SELATAN",
        provinceId: "71",
      },
      {
        id: "7171",
        name: "KOTA MANADO",
        provinceId: "71",
      },
      {
        id: "7172",
        name: "KOTA BITUNG",
        provinceId: "71",
      },
      {
        id: "7173",
        name: "KOTA TOMOHON",
        provinceId: "71",
      },
      {
        id: "7174",
        name: "KOTA KOTAMOBAGU",
        provinceId: "71",
      },
      {
        id: "7201",
        name: "KAB. BANGGAI",
        provinceId: "72",
      },
      {
        id: "7202",
        name: "KAB. POSO",
        provinceId: "72",
      },
      {
        id: "7203",
        name: "KAB. DONGGALA",
        provinceId: "72",
      },
      {
        id: "7204",
        name: "KAB. TOLI TOLI",
        provinceId: "72",
      },
      {
        id: "7205",
        name: "KAB. BUOL",
        provinceId: "72",
      },
      {
        id: "7206",
        name: "KAB. MOROWALI",
        provinceId: "72",
      },
      {
        id: "7207",
        name: "KAB. BANGGAI KEPULAUAN",
        provinceId: "72",
      },
      {
        id: "7208",
        name: "KAB. PARIGI MOUTONG",
        provinceId: "72",
      },
      {
        id: "7209",
        name: "KAB. TOJO UNA UNA",
        provinceId: "72",
      },
      {
        id: "7210",
        name: "KAB. SIGI",
        provinceId: "72",
      },
      {
        id: "7211",
        name: "KAB. BANGGAI LAUT",
        provinceId: "72",
      },
      {
        id: "7212",
        name: "KAB. MOROWALI UTARA",
        provinceId: "72",
      },
      {
        id: "7271",
        name: "KOTA PALU",
        provinceId: "72",
      },
      {
        id: "7301",
        name: "KAB. KEPULAUAN SELAYAR",
        provinceId: "73",
      },
      {
        id: "7302",
        name: "KAB. BULUKUMBA",
        provinceId: "73",
      },
      {
        id: "7303",
        name: "KAB. BANTAENG",
        provinceId: "73",
      },
      {
        id: "7304",
        name: "KAB. JENEPONTO",
        provinceId: "73",
      },
      {
        id: "7305",
        name: "KAB. TAKALAR",
        provinceId: "73",
      },
      {
        id: "7306",
        name: "KAB. GOWA",
        provinceId: "73",
      },
      {
        id: "7307",
        name: "KAB. SINJAI",
        provinceId: "73",
      },
      {
        id: "7308",
        name: "KAB. BONE",
        provinceId: "73",
      },
      {
        id: "7309",
        name: "KAB. MAROS",
        provinceId: "73",
      },
      {
        id: "7310",
        name: "KAB. PANGKAJENE KEPULAUAN",
        provinceId: "73",
      },
      {
        id: "7311",
        name: "KAB. BARRU",
        provinceId: "73",
      },
      {
        id: "7312",
        name: "KAB. SOPPENG",
        provinceId: "73",
      },
      {
        id: "7313",
        name: "KAB. WAJO",
        provinceId: "73",
      },
      {
        id: "7314",
        name: "KAB. SIDENRENG RAPPANG",
        provinceId: "73",
      },
      {
        id: "7315",
        name: "KAB. PINRANG",
        provinceId: "73",
      },
      {
        id: "7316",
        name: "KAB. ENREKANG",
        provinceId: "73",
      },
      {
        id: "7317",
        name: "KAB. LUWU",
        provinceId: "73",
      },
      {
        id: "7318",
        name: "KAB. TANA TORAJA",
        provinceId: "73",
      },
      {
        id: "7322",
        name: "KAB. LUWU UTARA",
        provinceId: "73",
      },
      {
        id: "7324",
        name: "KAB. LUWU TIMUR",
        provinceId: "73",
      },
      {
        id: "7326",
        name: "KAB. TORAJA UTARA",
        provinceId: "73",
      },
      {
        id: "7371",
        name: "KOTA MAKASSAR",
        provinceId: "73",
      },
      {
        id: "7372",
        name: "KOTA PARE PARE",
        provinceId: "73",
      },
      {
        id: "7373",
        name: "KOTA PALOPO",
        provinceId: "73",
      },
      {
        id: "7401",
        name: "KAB. KOLAKA",
        provinceId: "74",
      },
      {
        id: "7402",
        name: "KAB. KONAWE",
        provinceId: "74",
      },
      {
        id: "7403",
        name: "KAB. MUNA",
        provinceId: "74",
      },
      {
        id: "7404",
        name: "KAB. BUTON",
        provinceId: "74",
      },
      {
        id: "7405",
        name: "KAB. KONAWE SELATAN",
        provinceId: "74",
      },
      {
        id: "7406",
        name: "KAB. BOMBANA",
        provinceId: "74",
      },
      {
        id: "7407",
        name: "KAB. WAKATOBI",
        provinceId: "74",
      },
      {
        id: "7408",
        name: "KAB. KOLAKA UTARA",
        provinceId: "74",
      },
      {
        id: "7409",
        name: "KAB. KONAWE UTARA",
        provinceId: "74",
      },
      {
        id: "7410",
        name: "KAB. BUTON UTARA",
        provinceId: "74",
      },
      {
        id: "7411",
        name: "KAB. KOLAKA TIMUR",
        provinceId: "74",
      },
      {
        id: "7412",
        name: "KAB. KONAWE KEPULAUAN",
        provinceId: "74",
      },
      {
        id: "7413",
        name: "KAB. MUNA BARAT",
        provinceId: "74",
      },
      {
        id: "7414",
        name: "KAB. BUTON TENGAH",
        provinceId: "74",
      },
      {
        id: "7415",
        name: "KAB. BUTON SELATAN",
        provinceId: "74",
      },
      {
        id: "7471",
        name: "KOTA KENDARI",
        provinceId: "74",
      },
      {
        id: "7472",
        name: "KOTA BAU BAU",
        provinceId: "74",
      },
      {
        id: "7501",
        name: "KAB. GORONTALO",
        provinceId: "75",
      },
      {
        id: "7502",
        name: "KAB. BOALEMO",
        provinceId: "75",
      },
      {
        id: "7503",
        name: "KAB. BONE BOLANGO",
        provinceId: "75",
      },
      {
        id: "7504",
        name: "KAB. POHUWATO",
        provinceId: "75",
      },
      {
        id: "7505",
        name: "KAB. GORONTALO UTARA",
        provinceId: "75",
      },
      {
        id: "7571",
        name: "KOTA GORONTALO",
        provinceId: "75",
      },
      {
        id: "7601",
        name: "KAB. PASANGKAYU",
        provinceId: "76",
      },
      {
        id: "7602",
        name: "KAB. MAMUJU",
        provinceId: "76",
      },
      {
        id: "7603",
        name: "KAB. MAMASA",
        provinceId: "76",
      },
      {
        id: "7604",
        name: "KAB. POLEWALI MANDAR",
        provinceId: "76",
      },
      {
        id: "7605",
        name: "KAB. MAJENE",
        provinceId: "76",
      },
      {
        id: "7606",
        name: "KAB. MAMUJU TENGAH",
        provinceId: "76",
      },
      {
        id: "8101",
        name: "KAB. MALUKU TENGAH",
        provinceId: "81",
      },
      {
        id: "8102",
        name: "KAB. MALUKU TENGGARA",
        provinceId: "81",
      },
      {
        id: "8103",
        name: "KAB. KEPULAUAN TANIMBAR",
        provinceId: "81",
      },
      {
        id: "8104",
        name: "KAB. BURU",
        provinceId: "81",
      },
      {
        id: "8105",
        name: "KAB. SERAM BAGIAN TIMUR",
        provinceId: "81",
      },
      {
        id: "8106",
        name: "KAB. SERAM BAGIAN BARAT",
        provinceId: "81",
      },
      {
        id: "8107",
        name: "KAB. KEPULAUAN ARU",
        provinceId: "81",
      },
      {
        id: "8108",
        name: "KAB. MALUKU BARAT DAYA",
        provinceId: "81",
      },
      {
        id: "8109",
        name: "KAB. BURU SELATAN",
        provinceId: "81",
      },
      {
        id: "8171",
        name: "KOTA AMBON",
        provinceId: "81",
      },
      {
        id: "8172",
        name: "KOTA TUAL",
        provinceId: "81",
      },
      {
        id: "8201",
        name: "KAB. HALMAHERA BARAT",
        provinceId: "82",
      },
      {
        id: "8202",
        name: "KAB. HALMAHERA TENGAH",
        provinceId: "82",
      },
      {
        id: "8203",
        name: "KAB. HALMAHERA UTARA",
        provinceId: "82",
      },
      {
        id: "8204",
        name: "KAB. HALMAHERA SELATAN",
        provinceId: "82",
      },
      {
        id: "8205",
        name: "KAB. KEPULAUAN SULA",
        provinceId: "82",
      },
      {
        id: "8206",
        name: "KAB. HALMAHERA TIMUR",
        provinceId: "82",
      },
      {
        id: "8207",
        name: "KAB. PULAU MOROTAI",
        provinceId: "82",
      },
      {
        id: "8208",
        name: "KAB. PULAU TALIABU",
        provinceId: "82",
      },
      {
        id: "8271",
        name: "KOTA TERNATE",
        provinceId: "82",
      },
      {
        id: "8272",
        name: "KOTA TIDORE KEPULAUAN",
        provinceId: "82",
      },
      {
        id: "9103",
        name: "KAB. JAYAPURA",
        provinceId: "91",
      },
      {
        id: "9105",
        name: "KAB. KEPULAUAN YAPEN",
        provinceId: "91",
      },
      {
        id: "9106",
        name: "KAB. BIAK NUMFOR",
        provinceId: "91",
      },
      {
        id: "9110",
        name: "KAB. SARMI",
        provinceId: "91",
      },
      {
        id: "9111",
        name: "KAB. KEEROM",
        provinceId: "91",
      },
      {
        id: "9115",
        name: "KAB. WAROPEN",
        provinceId: "91",
      },
      {
        id: "9119",
        name: "KAB. SUPIORI",
        provinceId: "91",
      },
      {
        id: "9120",
        name: "KAB. MAMBERAMO RAYA",
        provinceId: "91",
      },
      {
        id: "9171",
        name: "KOTA JAYAPURA",
        provinceId: "91",
      },
      {
        id: "9201",
        name: "KAB. SORONG",
        provinceId: "92",
      },
      {
        id: "9202",
        name: "KAB. MANOKWARI",
        provinceId: "92",
      },
      {
        id: "9203",
        name: "KAB. FAK FAK",
        provinceId: "92",
      },
      {
        id: "9204",
        name: "KAB. SORONG SELATAN",
        provinceId: "92",
      },
      {
        id: "9205",
        name: "KAB. RAJA AMPAT",
        provinceId: "92",
      },
      {
        id: "9206",
        name: "KAB. TELUK BINTUNI",
        provinceId: "92",
      },
      {
        id: "9207",
        name: "KAB. TELUK WONDAMA",
        provinceId: "92",
      },
      {
        id: "9208",
        name: "KAB. KAIMANA",
        provinceId: "92",
      },
      {
        id: "9209",
        name: "KAB. TAMBRAUW",
        provinceId: "92",
      },
      {
        id: "9210",
        name: "KAB. MAYBRAT",
        provinceId: "92",
      },
      {
        id: "9211",
        name: "KAB. MANOKWARI SELATAN",
        provinceId: "92",
      },
      {
        id: "9212",
        name: "KAB. PEGUNUNGAN ARFAK",
        provinceId: "92",
      },
      {
        id: "9271",
        name: "KOTA SORONG",
        provinceId: "92",
      },
      {
        id: "9301",
        name: "KAB. MERAUKE",
        provinceId: "93",
      },
      {
        id: "9302",
        name: "KAB. BOVEN DIGOEL",
        provinceId: "93",
      },
      {
        id: "9303",
        name: "KAB. MAPPI",
        provinceId: "93",
      },
      {
        id: "9304",
        name: "KAB. ASMAT",
        provinceId: "93",
      },
      {
        id: "9401",
        name: "KAB. NABIRE",
        provinceId: "94",
      },
      {
        id: "9402",
        name: "KAB. PUNCAK JAYA",
        provinceId: "94",
      },
      {
        id: "9403",
        name: "KAB. PANIAI",
        provinceId: "94",
      },
      {
        id: "9404",
        name: "KAB. MIMIKA",
        provinceId: "94",
      },
      {
        id: "9405",
        name: "KAB. PUNCAK",
        provinceId: "94",
      },
      {
        id: "9406",
        name: "KAB. DOGIYAI",
        provinceId: "94",
      },
      {
        id: "9407",
        name: "KAB. INTAN JAYA",
        provinceId: "94",
      },
      {
        id: "9408",
        name: "KAB. DEIYAI",
        provinceId: "94",
      },
      {
        id: "9501",
        name: "KAB. JAYAWIJAYA",
        provinceId: "95",
      },
      {
        id: "9502",
        name: "KAB. PEGUNUNGAN BINTANG",
        provinceId: "95",
      },
      {
        id: "9503",
        name: "KAB. YAHUKIMO",
        provinceId: "95",
      },
      {
        id: "9504",
        name: "KAB. TOLIKARA",
        provinceId: "95",
      },
      {
        id: "9505",
        name: "KAB. MAMBERAMO TENGAH",
        provinceId: "95",
      },
      {
        id: "9506",
        name: "KAB. YALIMO",
        provinceId: "95",
      },
      {
        id: "9507",
        name: "KAB. LANNY JAYA",
        provinceId: "95",
      },
      {
        id: "9508",
        name: "KAB. NDUGA",
        provinceId: "95",
      },
    ],
  });

  console.log("✅ Created City");

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
