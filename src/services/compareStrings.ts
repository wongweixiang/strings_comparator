import API from "./API";

type CompareStringsParams = {
  pcode: string;
  string1pcode: string;
};

/*
type CompareStringsResponse = {
  COFball: string;
  COFball1: string;
  COFstatic: string;
  COFstatic1: string;
  brand: string;
  brand1: string;
  current: string;
  current1: string;
  energy: string;
  energy1: string;
  material: string;
  material1: string;
  pcode: string;
  pcode1: string;
  ratio: string;
  ratio1: string;
  scode1: string;
  scode2: string;
  stiffness: string;
  stiffness1: string;
  string: string;
  string1: string;
  tension: string;
  tension1: string;
};
*/

type StringData = {
  code: string;
  name: string;
  material: string;
  stats: {
    stiffness: string,
    tensionLoss: string,
    energyReturn: string,
    spinPotential: string,
    stringFriction: string,
    ballFriction: string,
  };
};

type CompareStringsResponse = {
  stringA: StringData
  stringB: StringData
}

export const compareStrings = async (
  params: CompareStringsParams,
): Promise<CompareStringsResponse> => {
  const rawResponse = await API.post(
    `/similarstringcompare.php`,
    params,
  );

  const {pcode, brand, string, material, stiffness, tension, energy, ratio, COFball, COFstatic} = rawResponse
  const {pcode1, brand1, string1, material1, stiffness1, tension1, energy1, ratio1, COFball1, COFstatic1} = rawResponse

  return {
    stringA: {
      code: pcode, 
      name: `${brand} ${string}`,

      material,
      stats: {
        stiffness,
        tensionLoss: tension,
        energyReturn: energy,
        spinPotential: ratio,
        stringFriction: COFstatic,
        ballFriction: COFball,

      }
    },
    stringB: {
      code: pcode1, 
      name: `${brand1} ${string1}`,

      material: material1,
      stats: {
        stiffness: stiffness1,
        tensionLoss: tension1,
        energyReturn: energy1,
        spinPotential: ratio1,
        stringFriction: COFstatic1,
        ballFriction: COFball1,

      }
    },
  }
};
