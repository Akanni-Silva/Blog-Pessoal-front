import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
        <div className="container flex justify-between text-lg mx-8">
          <Link to="/home" className="text-2xl font-bold hover:underline">
            Blog Pessoal
          </Link>
          <div className="flex gap-4">
            Postagens Temas 
            <Link to="/cadastro " className="hover:underline">Cadastrar</Link> tema Perfil 
            <Link to="/" className="hover:underline">Sair</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
