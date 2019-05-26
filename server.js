var { buildSchema } = require('graphql');
var express_graphql = require('express-graphql');
var express = require('express');

var app = express();

var courseFunc = (args) => {
   return allData.find(x => x.id === args.id);
}
var courseFuncAll = () => {
   return allData;
}
let changeTitleFunc = (args)=>{
   let course = allData.find(x=> x.id === args.id);
   if(!course) throw new Error('No course found');
 
   course.title = args.title;
   course.description = `this is ${ course.title } absolutly`;
   return course;
}
var root = {
   course: courseFunc,
   courses: courseFuncAll,
   changeTitle: changeTitleFunc
};

var schema = buildSchema(`
         type Query {
            course(id: Int!) : Course,
            courses: [Course]
         },
         type Mutation {
            changeTitle(id:Int!, title: String!): Course
         },
         type Course{
            id: Int,
            title: String
            description: String
            rate: Int
         }
`);

app.use('/graphql', express_graphql({
   schema: schema,
   rootValue: root,
   graphiql: true
}));
app.listen(4000, (response) => {
   console.log("Graphql project is running on port 4000");
});


let allData = [{
   id: 1,
   title: 'first course',
   description: ' this is first course absolutly',
   rate: 123
},
{
   id: 2,
   title: 'second course',
   description: ' this is first course absolutly',
   rate: 123
}];