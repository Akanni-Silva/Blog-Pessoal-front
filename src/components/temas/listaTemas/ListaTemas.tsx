/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyncLoader } from "react-spinners";
import CardTema from "../cardTema/CardTema";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContex } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";

function ListaTemas() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [temas, seTemas] = useState<Tema[]>([]);

  const { usuario, handleLogout } = useContext(AuthContex);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, [temas.length]);

  async function buscarTemas() {
    try {
      setIsLoading(true);

      await buscar("/temas", seTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (<div className="flex justify-center my-8"> <SyncLoader color="#312e81" size={32} /></div>) }
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          {!isLoading && temas.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum Tema foi encontrado!
            </span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaTemas;
