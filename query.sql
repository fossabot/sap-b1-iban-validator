-------------------------------------------------------------------------------
-- Author       Nico Finkernagel
-- Created      04/27/19 (mm/dd/yy)
-- Purpose      Fetching all Bussines Partners + Banking information from 
--              SAP Bussines One Database
-- Copyright ©  2019, Gruselhaus, All Rights Reserved
-------------------------------------------------------------------------------
-- Modification History
--
-- 01/01/0000  developer full name  
--      A comprehensive description of the changes. The description may use as 
--      many lines as needed.
-------------------------------------------------------------------------------

SELECT
  T0.CardCode,
  T0.CardName,
  T0.DflIBAN,
  T0.ValidFor,
  ISNULL(T0.FrozenComm,'')[FrozenComm],
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