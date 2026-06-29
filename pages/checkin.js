import Head from "next/head";
import { useState } from "react";

const employees = [
  { id: "CT00011", name: "Apratim Mahata", dept: "Technology" },
  { id: "CT00030", name: "Ronit Shrestha", dept: "Ecommerce" },
  { id: "CT00031", name: "Muskan Mondal", dept: "Design" },
  { id: "CT00013", name: "Shubham Pandey", dept: "Technology" },
  { id: "CT00049", name: "Tilak Rathoure", dept: "Technology" },
  { id: "CT00015", name: "Hrithik Singh", dept: "Site Operations" },
  { id: "CT00010", name: "Ruhbana Hasan", dept: "Ecommerce" },
  { id: "CT00037", name: "Swastik Sharma", dept: "Technology" },
  { id: "CT00026", name: "Mohan Nandanawad", dept: "Site Operations" },
  { id: "CT00043", name: "Shreyansh Srivastava", dept: "Technology" },
  { id: "CT00038", name: "Ashvin Tyagi", dept: "Marketing" },
  { id: "CT00023", name: "Soumesh Kundu", dept: "Technology" },
  { id: "CT0004",  name: "Madhushree BJ", dept: "Design" },
  { id: "CT00034", name: "Aditya Sharma", dept: "Site Operations" },
  { id: "CT00028", name: "Sushil Kumar", dept: "Site Operations" },
  { id: "CT0001",  name: "Vedang Singh", dept: "Site Operations" },
  { id: "CT00012", name: "Soumya Kanta Mohanty", dept: "Ecommerce" },
  { id:
