import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategoreis() {
  function Apiprodect23() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const res = useQuery({
    queryKey: "Apiprodect",
    queryFn: Apiprodect23,
  });
  return res;
}
