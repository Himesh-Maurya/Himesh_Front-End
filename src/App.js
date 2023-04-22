
import List from "./List";
var items=[
  {
       "text":"Raj"
       
   },
   {
    "text":"Pooja"
    
}, {
  "text":"Deep"
  
}
]

function App() {
  return (
    <div className="App">
      <List items={items}/>
    </div>
  );
}

export default App;
