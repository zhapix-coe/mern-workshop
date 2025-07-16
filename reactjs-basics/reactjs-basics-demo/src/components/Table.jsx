import { NestedChild } from "./NestedChild";

export const TableSection = (props) => {

  const internList = [
    {
      internId: 1,
      internName: 'SenthilKumar',
      internAge:20
    },
    {
      internId:2,
      internName:'Karthikeyan',
      internAge:30
    }
  ];
  
  return (
    <section class="table-section">
      <h3>Table Section {props.testParam}</h3>
      <table cellspacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {
            internList?.map((intern)=> <tr key={intern.internId}>
            <td>{intern.internName}</td>
            <td>{intern.internAge}</td>
          </tr>)
          }
        </tbody>
      </table>
      <NestedChild rootValue={props.rootValue} />
    </section>
  );
};
