import { Button, Modal, message, Upload  } from 'antd';
// import React, { useState } from 'react';
import { useEffect, useState } from "react";
import common from "./common.css"

const UploadModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const saveToIpfs = async (e) =>{
    e.preventDefault();
    // 获取input上传的文件
    let file = e.target.files[0];
    console.log("file:")
    // const ipfs = await this.$ipfs;
    const projectId = "2EJLXd43olPvCLiOP0MTUiSk3dM";
    const projectSecret = "6b8e34124d3dd04a205335bf97863758";
    const auth =
      "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
    const ipfs = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
    try {
      const added = await ipfs.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
  
      // 获取上传文件hash值，'https://ipfs.io/ipfs/'+hashCode 即为上传后的文件地址
      const hashCode = added.cid.toString();
      // let imageHashUrl = 'https://ipfs.io/ipfs/'+hashCode
      setIpfsImage(hashCode)
      console.log("saveToIpfs hashCode:", 'https://ipfs.io/ipfs/'+hashCode)

    } catch (err) {
      console.error(err);
    }
  }
  const test = async(e)=>{
    e.preventDefault();
  }

  const projectId = "2EJLXd43olPvCLiOP0MTUiSk3dM";
  const projectSecret = "6b8e34124d3dd04a205335bf97863758";
  const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const props = {
    name: 'file',
    action: 'https://ipfs.infura.io:5001',
    headers: {
      authorization: 'auth',
    },
  }
  
    const onChange = async (info) =>{
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      let file = info.file;
      const projectId = "2EJLXd43olPvCLiOP0MTUiSk3dM";
      const projectSecret = "6b8e34124d3dd04a205335bf97863758";
      const auth =
        "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
      const ipfs = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
          authorization: auth,
        },
      });
    try {
      const added = await ipfs.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
  
      // 获取上传文件hash值，'https://ipfs.io/ipfs/'+hashCode 即为上传后的文件地址
      const hashCode = added.cid.toString();
      // let imageHashUrl = 'https://ipfs.io/ipfs/'+hashCode
      setIpfsImage(hashCode)
      console.log("saveToIpfs hashCode:", 'https://ipfs.io/ipfs/'+hashCode)

      if (hashCode) {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }


    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='uploadModal'>
      <Button type="primary" onClick={showModal}>
        UPLOAD NFT POSTER
      </Button>
      <Modal title="UPLOAD NFT POSTER" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Upload {...props}>
        <Button>Click to Upload</Button>
      </Upload>
      </Modal>
    </div>
  );
};

export default UploadModal;