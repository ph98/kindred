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
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  onInvite: () => void;
}

const DEFAULT_SPACE = 10;

const InviteModal: FC<InviteModalProps> = ({
  visible,
  setVisible,
  onInvite,
  phone,
  setPhone,
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
            <Text style={[styles.headerText, styles.txt]}>
              Invite new member
            </Text>
          </Layout>
          <Text style={[styles.input, styles.txt]}>
            Please enter new member's phone number
          </Text>
          <Input
            style={styles.input}
            value={phone}
            onChangeText={t => setPhone(t)}
          />
          <Button style={styles.input} onPress={onInvite}>
            <Text>Send invitation</Text>
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
