"use client";
import React from 'react';
import { getCustomerById } from "@/app/lib/api_customer";

export default async function UserIdPage({ params }) {
  const idCustomer = React.use(params);
  const {customer} = await getCustomerById(idCustomer);
  return (
    <div>
      <h1>User: {customer.role}</h1>
    </div>
  );
}