// import  Button from "react-bootstrap/Button";

// function MyFooter() {
//   return (
//     <footer>
//       <p>Author: HBao</p>
//       <p>Created by: bao301012005@gmail.com</p>
//       <p>&copy; {new Date().getFullYear()} HBao. All rights reserved </p>
//       <Button variant="link" href="https://github.com/HBao30101/HoaiBao-DE191051-FER202" >My Link Github's project: Movies Management </Button>
//     </footer>
//   )
// }
// export default MyFooter;

import  Button from "react-bootstrap/Button";
import "./Footer.css";

function MyFooter({author, email, linkGithub}) {
  return (
    <footer>
      <p>Author: {author}</p>
      <p>Created by: {email} </p>
      <p>&copy; {new Date().getFullYear()} HBao. All rights reserved </p>
      <Button variant="link" href="https://github.com/HBao30101/HoaiBao-DE191051-FER202" >My Link Github: {linkGithub}</Button>
    </footer>
  )
}
export default MyFooter;