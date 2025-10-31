import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContex);

  function logout() {
    handleLogout();
    ToastAlerta("O Usuário foi desconectado com sucesso!",'info');
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
        <div className="container flex justify-between text-lg mx-8">
          <Link to="/" className="text-2xl font-bold hover:underline">
            Blog Pessoal
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/perfil" className="hover:underline">
              <img
                src={usuario?.foto || "https://i.imgur.com/pK6vSCy.png"}
                className="h-10 rounded-full hover:h-12 duration-500"
                alt={usuario?.nome}
              />
            </Link>
            <Link to="/postagens" className="hover:underline">
              Postagens
            </Link>
            <Link to="/temas " className="hover:underline">
              Temas
            </Link>
            <Link to="/cadastrartema " className="hover:underline">
              Cadastrar Tema
            </Link>
            <Link to="" onClick={logout} className="hover:underline">
              Sair
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    component = (
      <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
        <div className="container flex justify-between text-lg mx-8">
          <Link to="" className="text-2xl font-bold hover:underline">
            Blog Pessoal
          </Link>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">
              Entrar
            </Link>
            <p>|</p>
            <Link to="/cadastro" className="hover:underline">
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Navbar;
