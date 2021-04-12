fs =[
    {
        name: 'Bob',
        children: [
            {
                name: 'Ashley',
                children: [
                    {
                        name: 'smita', 
                        children: [
                            { name: 'Prashant'},
                            { name: 'Mohan'}
                        ]
                    },
                    {name: 'pushpa'}
                ]
            },
            {
                name: 'Logan',
                children: [
                    {name: 'Frank'},
                    {name: 'Jasmine'}
                ]
            }
        ]
    }
];

const getChildren = (path) => {
  //TestingPurposeOnly
  if(path==='root'){
    return fs.map((elem)=>{
      return elem.name
    })
  }
}

console.log(getChildren('root'))
