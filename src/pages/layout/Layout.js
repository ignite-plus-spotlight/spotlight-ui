// import React, { Component } from 'react'
// import Dashboard from '../dashboard/Dashboard'


// export class Layout extends Component {
//     render() {
//         return (
//             <div >
//                 <Dashboard/>
//                 { this.props.children }

//             </div>
//         )
//     }
// }
// export default Layout





 
// import React,{useState} from 'react'
// import axios from 'axios';
// import DashboardV from '../dashboard/DashboardV'
// import DashboardM from '../dashboard/DashboardM'
// import DashboardT from '../dashboard/DashboardT'
// import ReactDOM from 'react-dom'

// export default function Layout() {
//     const [data,setData]=useState({
        
//     })

//     const [value, setValue] = React.useState(
//         JSON.parse(localStorage.getItem('userData')) 
//       );
//       let current=value.data.empId;
//     //   console.log(current)
      
//       axios.get(`http://localhost:8081/${current}/employeeroles`)
//       .then(res=>{
//         //   console.log(res)
//         //   const role =setData(res.data[0])
//           console.log(res.data[0].roleName)
        
//       }
//       )

//    return (
//        <div>
   
              
//   </div>

//    )
    
   
// }


