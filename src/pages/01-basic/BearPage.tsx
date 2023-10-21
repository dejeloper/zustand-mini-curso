import { useShallow } from "zustand/react/shallow";
import { WhiteCard } from "../../components";
import { useBearsStore } from "../../stores";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />

        <PolarBears />

        <PandaBears />

        <DisplayBears />
      </div>
    </>
  );
};

export const BlackBears = () => {
  const blackBear = useBearsStore((state) => state.blackBears);
  const increasedBlackBears = useBearsStore(
    (state) => state.increasedBlackBears
  );
  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasedBlackBears(-1)}>-1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBear} </span>
        <button onClick={() => increasedBlackBears(+1)}>+1</button>
      </div>
    </WhiteCard>
  );
};

export const PolarBears = () => {
  const polarBear = useBearsStore((state) => state.polarBears);
  const increasedPolarBears = useBearsStore(
    (state) => state.increasedPolarBears
  );

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasedPolarBears(-1)}>-1</button>
        <span className="text-3xl mx-2 lg:mx-10">{polarBear}</span>
        <button onClick={() => increasedPolarBears(+1)}> +1</button>
      </div>
    </WhiteCard>
  );
};

export const PandaBears = () => {
  const pandaBears = useBearsStore((state) => state.pandaBears);
  const increasedPandaBears = useBearsStore(
    (state) => state.increasedPandaBears
  );

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasedPandaBears(-1)}>-1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button onClick={() => increasedPandaBears(+1)}> +1</button>
      </div>
    </WhiteCard>
  );
};

export const DisplayBears = () => {
  const bears = useBearsStore(useShallow((state) => state.bears));
  const doNothing = useBearsStore((state) => state.doNothing);
  const addBear = useBearsStore((state) => state.addBear);
  const clearBears = useBearsStore((state) => state.clearBears);

  return (
    <WhiteCard>
      <h2>Osos</h2>
      <button className="mt-2" onClick={doNothing}>
        No hacer nada
      </button>
      <button className="mt-2" onClick={addBear}>
        Agregar Oso
      </button>
      <button className="mt-2" onClick={clearBears}>
        Borrar osos
      </button>

      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};
