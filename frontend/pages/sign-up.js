import React, {useEffect, useState } from 'react';
import Link from 'next/link';
import SignUp from "../components/Auth/SignUp";
import { BACKEND_URL } from '../config/constant';
import axios from 'axios'

const Register = () => {
  const [cities, setCities] = useState([]);
  const [ provinces, setProvinces ] = useState([]);
  const [ occupations, setOccupations ] = useState([]);

  const getOccupations = async () => {
    axios.get(BACKEND_URL+'/api/occupations', {params: {populate:'*'}})
    .then(function (response) {
        const options = [];
        response.data.data.map((occupation) => {
          options.push({label: occupation.attributes.name_fr, value: occupation.id})
        })
        setOccupations(options);
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  const getProvinces = async () => {
    axios.get(BACKEND_URL+'/api/uprovinces', {params: {populate:'*'}})
    .then(function (response) {
      const options = [];
      response.data.data.map((province) => {
        options.push({label: province.attributes.name_fr, value: province.id})
      })
      setProvinces(options);
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  useEffect(() => {
    getProvinces();
    getOccupations();
  }, [])

  return (
    <SignUp provinces={provinces} occupations={occupations}/>
  )
}
export default Register;

export const getStaticProps = ({req, res}) => {
  let initialProps = {};
  return {
    props: {
      initialProps: initialProps
    }
  }
}