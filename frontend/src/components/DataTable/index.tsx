import axios from "axios";
import { useEffect, useState } from "react";
import {SalePage} from 'types/sale';
import { formatLocalDate } from "util/format";
import { BASE_URL } from "util/request";

const DataTable = () => {

    const [page, setPage] = useState<SalePage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    })

    useEffect(() => {
        axios.get(`${BASE_URL}/sales?page=0&size=5&sort=date,desc`)
            .then(response => {
                setPage(response.data);
            });
    }, []);
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Data</th>
            <th>Vendedor</th>
            <th>Clientes visitados</th>
            <th>Negócios fechados</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
            {page.content?.map(x => (
                <tr key={x.id}>
                <th>{formatLocalDate(x.date, "dd/MM/yyyy")}</th>
                <th>{x.seller.name}</th>
                <th>{x.visited}</th>
                <th>{x.deals}</th>
                <th>{x.amount.toFixed(2)}</th>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
