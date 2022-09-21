import { Space, Table } from "antd";
import { useState } from "react";
import { BrandModel } from "../../../Models/brand-model";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";

export const AdminTopBrands = () => {
  const phones = useSelector((state: RootState) => state.store.phones);
  const [topBrands, setTopBrands] = useState<BrandModel[]>([]);

  const columns = [];

  return (
    <Space direction="vertical" style={{ width: '100%', padding: '10px' }}>
      <Table columns={columns} dataSource={topBrands} rowKey={'_id'} />
    </Space>
  );
};