import React from "react";
import { useParams } from "react-router-dom";
import { useGetDealByIdQuery } from "state/api";

const DealOverview = () => {
  const { id } = useParams();

  const { data: deal, isLoading: isDealLoading } = useGetDealByIdQuery(id);

  return (
    <div>
      <h1>{deal?.title}</h1>
      <p>{deal?.description}</p>
      <p>{deal?.price}</p>
      <p>{deal?.status}</p>
      <p>{deal?.companyId?.name}</p>
      <p>
        {deal?.userId?.firstName} {deal?.userId?.lastName}
      </p>
    </div>
  );
};

export default DealOverview;
