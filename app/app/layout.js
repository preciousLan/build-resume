import NavBar from "../_components/NavBar"

const layout = ({children}) => {
  return (
    <div className="min-h-screen bg-gray-50">
       <NavBar/>
       {children}
        </div>
  )
}

export default layout