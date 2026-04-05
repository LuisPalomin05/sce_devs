import { useState } from "react"
import '../assets/almacen.css';
import { Save, ChevronRight, LayersPlus, X,DollarSign,ListPlus } from "lucide-react";
import { Link, useParams } from 'react-router-dom';




const CreateProducto = () => {

    const {id} = useParams();

    console.log(params);

    const [isEdit, setEdit] = useState(false)


    return (
        <div className="CrearProd">
            <div className='TittleCreate'>
                <section><LayersPlus className="cardLayer" /></section>
                <section className="textTitleCreate">
                    <div className="routeLayer">
                        <Link className="bnj" to={'/dashboard/almacen'}>
                            <small>Almacen</small>
                        </Link>
                        <ChevronRight size={10} />
                        <small>{id ? ('Editar'):('Crear')} Producto</small>
                    </div>
                    <p>Crear Producto</p>
                    <small>Anade un nuevo producto a el almacen</small>

                </section>
                <Link to={'/dashboard/almacen'}>

                    <section className="cerrar">
                        <X />
                    </section>
                </Link>
            </div>
            <div className="InputCreate">

                <div className="InputItenCreate"><label htmlFor="descripcion">Nombre del producto</label><input type="text" name="descripcion" placeholder="Ej. ARANDELA PLANA ZINCADA 1/2" /></div>
                <div className="GroupItem">
                    <div className="InputItenCreate"><label htmlFor="percio">Precio</label> <div  className="inputCreates"> <DollarSign /> <input type="text" name="precio" placeholder="0.00" /></div> </div>
                    <div className="InputItenCreate"><label htmlFor="cantidad">Cantidad</label> <div className="inputCreates">  <ListPlus /> <input type="text" name="cantidad" placeholder="0" /></div></div>
                </div>
                <div className="descriptionCreate">
                    <div className="descpTittle">
                        <p>Descripcion</p>
                        <small>Ingresa una descripcion del producto</small>
                    </div>

                    <textarea id="descripcion" placeholder="Especifique dimensiones, tamaño, origen, acabados o informacion adicional">

                    </textarea>
                </div>
            </div>

            <div className="btnCreateContent">
                <div className="bnk"></div>
                <div className="btnsCreate">
                    <Link to={'/dashboard/almacen'} className="createBtn">CANCELAR</Link>
                    <button className='createBtn' type="submit"> <Save /> GUARDAR</button>

                </div>
            </div>

        </div>
    )
}

export default CreateProducto;