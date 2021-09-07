import React, {Dispatch, FC, SetStateAction} from 'react';
import {
  StyleService,
  Modal,
  Card,
  Button,
  Input,
  Layout,
} from '@ui-kitten/components';
import {Text} from 'react-native';

interface InviteModalProps {
  title: string;
  description: string;
  visible: boolean;
  buttonText: string;
  placeHolder: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onOk: () => void;
}

const DEFAULT_SPACE = 10;

const InviteModal: FC<InviteModalProps> = ({
  title,
  description,
  placeHolder,
  visible,
  buttonText,
  setVisible,
  onOk,
  value,
  setValue,
}) => {
  return (
    <Modal
      style={styles.modal}
      visible={visible}
      backdropStyle={styles.backDrop}
      onBackdropPress={() => setVisible(false)}>
      <Card disabled>
        <Layout>
          <Layout style={[styles.separatorLine, styles.header]}>
            <Text style={[styles.headerText, styles.txt]}>{title}</Text>
          </Layout>
          <Text style={[styles.input, styles.txt]}>{description}</Text>
          <Input
            placeholder={placeHolder}
            style={styles.input}
            value={value}
            onChangeText={t => setValue(t)}
          />
          <Button style={styles.input} onPress={onOk}>
            <Text>{buttonText}</Text>
          </Button>
        </Layout>
      </Card>
    </Modal>
  );
};

export default InviteModal;

const styles = StyleService.create({
  modal: {
    width: '90%',
  },
  separatorLine: {
    borderBottomWidth: 1,
    borderColor: '#e7f0ef',
  },
  txt: {
    color: '#06514a',
  },
  input: {
    margin: DEFAULT_SPACE,
  },
  header: {
    paddingVertical: DEFAULT_SPACE,
    marginVertical: DEFAULT_SPACE,
  },
  backDrop: {
    backgroundColor: '#1c3331',
    opacity: 0.8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
