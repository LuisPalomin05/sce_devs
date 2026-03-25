import { DynamicIcon } from "lucide-react/dynamic";
import { useInfo } from '../hooks/useInfo';
import { useState, useEffect, useRef } from "react";


const SelectAccount = () => {
    const containerRef = useRef(null);

    const { empresas, empresa, setEmpresa } = useInfo();

    const [isVisible, setVisible] = useState(false);

    // console.log(empresas[0].ruc);

    useEffect(() => {
        if (empresas && empresas.length > 0) {
            setEmpresa(empresas[0]);
        }
    }, [empresas]);

    // const handleVisibility = () => {
    //     setVisible(!isVisible);
    // }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='EmpresaTitle' ref={containerRef}>
            <div className="orangebg">
                <DynamicIcon name={'store'} size={22} color='#efebeb' />
            </div>

            <div className='InfoSideTitle'>
                <p className='fontBlack'>{empresa.razon_social}</p>
                <p className='fontGrayInfo'>ruc: {empresa.ruc}</p>
            </div>

            <div className='cambiarEmpresa' onClick={() => setVisible(!isVisible)}>
                <DynamicIcon name={'arrow-right-left'} size={22} color='#535050' />
            </div>

            {
                isVisible && (
                    <div id="cardAccounts">
                        <p>Selecciona la empresa a administrar :</p>
                        {
                            empresas.map((empresaItem, index) => {
                                return (
                                    <div className="AccountJobs" key={index} onClick={() => {
                                        setEmpresa(empresaItem);
                                        setVisible(false);
                                    }}>
                                        <strong>{empresaItem.razon_social}</strong>
                                        <p>{empresaItem.ruc}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                )
            }


        </div>
    )
}

export default SelectAccount;