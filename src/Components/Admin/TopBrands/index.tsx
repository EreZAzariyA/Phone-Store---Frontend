import { BrandModel } from "../../../Models/brand-model";
import { Space, Table } from "antd";

export const AdminTopBrands = () => {
  const topBrands: BrandModel[] = [];
  const columns = [];

  return (
    <Space direction="vertical" style={{ width: '100%', padding: '10px' }}>
      <Table columns={columns} dataSource={topBrands} rowKey={'_id'} />
    </Space>
  );
};