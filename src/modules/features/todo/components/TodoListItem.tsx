import React from 'react';

interface TProps {
  title: string;
  id: number;
}

// normal usual function
function TodoListItem(props: TProps): JSX.Element {
  return (
    <div>
      <p style={{ border: '1px solid #ddd', padding: 10 }}>
        {props.id}. {props.title}
      </p>
    </div>
  );
}

//with arrow function
// const TodoListItemArrow: React.FC<TProps> = ({ id, title }: TProps): JSX.Element => {
//   return (
//     <div>
//       <p style={{ border: '1px solid #ddd', padding: 10 }}>
//         {id}. {title}
//       </p>
//     </div>
//   );
// };

export default TodoListItem;
