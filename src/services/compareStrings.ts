import API from "./API";

type CompareStringsParams = {
  pcode: string;
  string1pcode: string;
};

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

export const compareStrings = async (
  params: CompareStringsParams,
): Promise<CompareStringsResponse> => {
  return await API.post(
    `/api/learning_center/similarstringcompare.php`,
    params,
  );
};
