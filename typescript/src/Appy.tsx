import { InputHTMLAttributes, ReactNode, FC, ChangeEventHandler, FormEventHandler, useState } from 'react';
import styled from 'styled-components';

import './App.css';

type CustomInputProps = {
  prefixComponent?: ReactNode;
};

type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomInputProps;

const Input: FC<InputProps> = ({ prefixComponent, ...props })  => (
  <>
    {prefixComponent}
    <input {...props} />
  </>
)

type Meal = {
  name: string;
  url: string;
}

type MealsResponse = {
  data: Meal[];
}

async function getMeals(meal: string): Promise<Meal[]> {
  const { data } = await fetch(`https://mocki.io/v1/e230804d-2161-40c6-8094-a85ff0a3a0c8?meal=${meal}`).then<MealsResponse>(response => response.json())

  return data;
}


const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid;
  width: 250px;
  margin: 50px;
  border-radius: 10px;
  overflow: hidden;
`;

const MealCard = ({ name, url }: Meal) => {
  return <Card>
    <img src={url} alt="" />
    <p>{name}</p>
  </Card>
}

const MealsContainer = styled.div<{ empty?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: ${({ empty }) => empty ? 'red' : 'transparent'}
`;

function App() {
  const [value, setValue] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setValue(target.value);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setMeals(await getMeals(value));
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <Input prefixComponent={<h1>Meals </h1>} value={value} onChange={handleInputChange}  />
        </form>
        <MealsContainer>
          {meals.map(meal => <MealCard key={meal.name} {...meal} />)}
        </MealsContainer>
      </header>
    </div>
  );
}

export default App;
