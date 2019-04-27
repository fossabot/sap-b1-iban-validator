SELECT
  T0.CardCode,
  T0.CardName,
  T0.DflIBAN,
  T0.ValidFor,
  T0.FrozenComm,
  (SELECT
    S0.PymntGroup
  FROM
    OCTG S0
  WHERE 
      S0.GroupNum = T0.GroupNum)[PymntGroup]
FROM
  OCRD T0
WHERE 
  T0.DflIBAN IS NOT NULL
  AND T0.DflIBAN <> ''