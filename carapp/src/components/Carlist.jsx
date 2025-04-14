import { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Addcar from "./AddCar";
import Editcar from "./EditCar";


ModuleRegistry.registerModules([AllCommunityModule]);

export default function Carlist() {

    const [cars, setCars] = useState([]);
    const gridRef = useRef();
    const [open, setOpen] = useState(false);


    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    const columns = [
        {headerName: 'Brand', field: 'brand'},
        {headerName: 'Model', field: 'model'},
        {headerName: 'Color', field: 'color'},
        {headerName: 'Fuel', field: 'fuel'},
        {headerName: 'Model Year', field: 'modelYear'},
        {headerName: 'Price', field: 'price'},
        {headerName: '', field: 'edit', filter: false, sortable: false, width: 100,
            cellRenderer: (params) => <Editcar updateCar={updateCar} car={params.data} />
        },
        {headerName: '', filter: false, sortable: false, width: 100, field: '_links.self.href',
            cellRenderer: (params) => 
            <Button size="small" color="secondary" onClick={() => deleteCar(params.value)}>Delete</Button>
        }
      ]

      const saveCar = (car) => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

      const deleteCar = (url) => {
        if (window.confirm("Are you sure?")) {
        fetch(url, {method: 'DELETE'})
        .then(res => {
            setOpen(true);
            fetchData()})
        .catch(err => console.error(err))
      }
    }

    const updateCar = (car, url) => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
      };
    
    
    return (
        <div>
            <Addcar saveCar={saveCar} />
            <div style={{ height: '600px', width: '99vw'}}>
                <AgGridReact 
                    ref={gridRef}
                    onGridReady={ params => gridRef.current = params.api }
                    rowData={cars}
                    columnDefs={columns}
                    rowSelection={{ mode: 'singleRow', checkboxes: false }}
                    pagination={true}       
                    paginationPageSize={10}
                    paginationPageSizeSelector={[5, 10, 25, 50]} 
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Car deleted"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            ></Snackbar>
        </div>
    );
}