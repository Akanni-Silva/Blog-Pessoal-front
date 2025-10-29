/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { AuthContex } from "../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader, SyncLoader } from "react-spinners";

function DeletarTema() {
  const navigate = useNavigate();

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContex);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    setIsLoading(true);
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
    setIsLoading(false);
  }
  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  });

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarTema() {
    setIsLoading(true);
    try {
      await deletar(`/temas/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      alert("Tema apagado com sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        alert("Erro ao Deletar o tema.");
      }
    }
    setIsLoading(false);
    retornar();
  }
  function retornar() {
    navigate("/temas");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Tema</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza que deseja apagar o tema a seguir?
      </p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Tema
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">
          {isLoading ? (
            <div className="flex justify-center">
              <SyncLoader color="#283593" size={5} />
            </div>
          ) : (
            tema.descricao
          )}
        </p>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="text-slate-100 bg-indigo-400 hover:bg-indigo-600 w-full flex items-center justify-center"
            onClick={deletarTema}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;
