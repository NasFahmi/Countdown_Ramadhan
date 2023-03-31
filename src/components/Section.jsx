import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark, faMap } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Section() {
  //UseState Currenct Time
  const [Time, setTime] = useState({
    day: '',
    month: '',
    year: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  //UseState Save City Country
  const [Data, setData] = useState({})
  // const [Location, setLocation] = useState({
  //   City: '',
  //   Country: ''
  // })
  const [City, setCity] = useState('')
  const [Country, setCountry] = useState('')
  //UseState Position Coordinate
  const [Position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [LocationAccess, setLocationAccess] = useState(true)
  //UseState Search Location
  const [locationSearch, setlocationSearch] = useState('')
  const [dataLocation, setdataLocation] = useState()
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];

  // UseEffect Current Time
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime({
        day: days[date.getDay()],
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [Time])



  //Get Location with GPS
  const getCoordFromLocation = async () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setPosition({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        })
        console.log(Position)
      })
      setLocationAccess(true)
    }
    else {
      console.log('Lokasi tidak diizinkan')
      setLocationAccess(false)
    }
  }

  //Get Latitude and Longitude
  const getcoords = async () => {
    try {
      const respon = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${Position.latitude}&lon=${Position.longitude}`)
      // console.log(respon.data)
      setCity(respon.data.address.city)
      setCountry(respon.data.address.country)
    } catch (error) {
      console.log(error)
    }
  }

  //Fect Data With Location
  async function fetchData() {
    try {
      const respon = await axios.get(`https://api.aladhan.com/v1/calendarByCity/2023/3?city=${City}&country=${Country}&method=2`)
      const datenow = new Date()
      let daysnow = datenow.getDate() - 1;
      setData(respon.data.data[daysnow].timings)
    } catch (error) {
      console.log(error)
    }

  }
  // UseEffect Location GPS
  useEffect(() => {
    console.log(City,Country)
    getCoordFromLocation()
    getcoords()
    fetchData()

  }, [City,Country])

  // function location search
  const handleLocationSearch = (e) => {
    setlocationSearch(e.target.value)
  }

  const SearchLocation = (e) => {
    e.preventDefault()
    const options = {
      method: 'GET',
      url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
      params: { address: `${locationSearch}`, language: 'en' },
      headers: {
        'X-RapidAPI-Key': '1782d60597msha81d88462cc5d55p1b8f17jsn50d0a67b963c',
        'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data.results[0])
      setdataLocation(response.data.results[0])
    }).catch(function (error) {
      console.error(error);
    });
    console.log(locationSearch)
    console.log(dataLocation)

  }
  const clearSearch = () => {
    setlocationSearch('')
    setdataLocation('')
  }
  const SelectLocation = () =>{
    const city = dataLocation.locality || dataLocation.region
    const country = dataLocation.country
    setCity(city)
    setCountry(country)
  }





  return (
    <div>
      <div className="background bg-Sand w-full h-full">
        <div className="bg-darkBlue w-full h-full z-10 rounded-t-[45px] py-8 flex justify-center items-center flex-col">
          <div className="container py-8 flex justify-center items-center flex-col">
            <div className="container px-8 ">
              <form action="" method="get">
                <div className="flex justify-between items-center flex-col gap-2 px-2 bg-whiteCostume  py-2  mx-auto rounded-lg max-w-[316px] md:max-w-sm lg:max-w-md">
                  <div className="flex justify-between items-center gap-2 md:gap-20 lg:gap-36">
                    <div className="logoSearch flex justify-between items-center gap-2 ">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                      <div>
                        <input
                          type="text"
                          placeholder="Search Location"
                          className="text-sm w-full py-2 bg-transparent focus:outline-none md:w-[140%] lg:w-[170%]"
                          onChange={handleLocationSearch}
                          value={locationSearch}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <FontAwesomeIcon icon={faXmark} onClick={clearSearch} />
                      <button className="bg-darkBlue py-2 px-3 text-white rounded-lg cursor-pointer" onClick={SearchLocation}>Search</button>
                    </div>
                  </div>
                  {dataLocation ? (
                    <div className="flex justify-start items-center gap-2 cursor-pointer" onClick={SelectLocation}>
                      {dataLocation ? (
                        <FontAwesomeIcon icon={faMap} className="text-darkBlue cursor-pointer" />
                      ) : null}
                      <p><span className="font-medium">{dataLocation?.locality || dataLocation?.region}</span> {dataLocation?.country}</p>
                    </div>
                  ) : null}
                </div>
              </form>
              {LocationAccess ?
                <h1 className="text-center text-lg text-white font-semibold mt-8 mb-4 md:text-2xl">
                  Current Location is {City} {Country}
                </h1> :
                <h1 className="text-center text-lg text-white font-semibold mt-8 mb-4 md:text-2xl">
                  Current Location is Unknown
                </h1>}

              <div className="bg-whiteCostume rounded-2xl  mx-auto h-fit px-8 py-5 max-w-[316px]  lg:max-w-sm">
                <h1 className="text-center">Current Time</h1>
                <h1 className="font-semibold text-2xl mt-1 text-center">
                  {Time.day} {Time.month} {Time.year}
                </h1>
                <div className="flex justify-center items-center mt-2 gap-5 md:gap-3">
                  <div className="clock flex justify-center items-center flex-col w-12">
                    <h1 className="font-medium  text-4xl">{Time.hours}</h1>
                  </div>
                  <h1 className="font-medium  text-2xl">:</h1>
                  <div className="clock flex justify-center items-center flex-col w-12">
                    <h1 className="font-medium  text-4xl">{Time.minutes}</h1>
                  </div>
                  <h1 className="font-medium  text-2xl">:</h1>
                  <div className="clock flex justify-center items-center flex-col w-12">
                    <h1 className="font-medium  text-4xl">{Time.seconds}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 justify-center items-center px-8 gap-4 mt-8 md:grid-cols-4 md:grid-flow-row lg:grid-cols-6">
              <div className="bg-whiteCostume rounded-2xl w-full max-w-xs px-10 py-5">
                <h1 className="text-center font-medium">Imsak</h1>
                <h1 className="text-center">{Data.Imsak}</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-full max-w-xs px-10 py-5">
                <h1 className="text-center font-medium">Shubuh</h1>
                <h1 className="text-center">{Data.Fajr}</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-full max-w-xs px-10 py-5">
                <h1 className="text-center font-medium">Dhuhur</h1>
                <h1 className="text-center">{Data.Dhuhr}</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-full max-w-xs px-10 py-5">
                <h1 className="text-center font-medium">Ashar</h1>
                <h1 className="text-center">{Data.Asr}</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-full max-w-xs px-10 py-5 md:row-start-2 md:col-start-2 lg:row-start-auto lg:col-start-auto">
                <h1 className="text-center font-medium">Magrib</h1>
                <h1 className="text-center">{Data.Maghrib}</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-full max-w-xs px-10 py-5 md:row-start-2 md:col-start-3 lg:row-start-auto lg:col-start-auto">
                <h1 className="text-center font-medium">Isya</h1>
                <h1 className="text-center">{Data.Isha}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
