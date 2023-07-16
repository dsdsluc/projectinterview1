import { Button, Modal, Form, Input, message  } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAllItem } from "../../action/Cart";
import { finshCart } from "../../action/Finsh";

function Payment() {
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const openMessage = () => {
      messageApi.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });
      setTimeout(() => {
        messageApi.open({
          key,
          type: 'success',
          content: 'Loaded! Cua hang se lien he lai voi quy khach sau ',
          duration: 2,
        });
        setTimeout(()=>{
          dispatch(deleteAllItem());     
          dispatch(finshCart(true)) 
        },1300);

      }, 1000);
    };
    
  const [modal, setModal] = useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
    
  };
  const handlFinsh = (value) => {
    console.log(value);
    setModal(false);
    openMessage();
    form.resetFields();

  };
  return (
    <>
     {contextHolder}
      <Button
        onClick={handleOpen}
        icon={<CreditCardOutlined />}
        danger
        size="large"
      >
        Thanh toan
      </Button>
      <Modal
        title="Basic Modal"
        open={modal}
        onCancel={handleClose}
        onOk={handleClose}
      >
        <Form onFinish={handlFinsh} form={form}>
          <Form.Item name="fullname" label="Ho va Ten" required>
            <Input placeholder="Ho Va Ten" />
          </Form.Item>
          <Form.Item name="addres" label="Dia Chi" required>
            <Input placeholder="19A/10 khu pho Dong Nhi ... " />
          </Form.Item>
          <Form.Item name="phone" label="So dien thoai" required>
            <Input type="number" placeholder="0123456789" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thanh Toan
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default Payment;
