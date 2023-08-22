export const calculateSkip = (page: number, pageSize: number): number => {
    let skip: number;
    skip = (page - 1) * pageSize;
    return skip;
  };
  