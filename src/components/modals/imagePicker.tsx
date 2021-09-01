import React, {Dispatch, FC, SetStateAction} from 'react';
import {StyleService, Modal, Card, Button} from '@ui-kitten/components';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';

interface ImagePickerModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<Asset | null>>;
}

const ImagePickerModal: FC<ImagePickerModalProps> = ({
  visible,
  setVisible,
  setImage,
}) => {
  const handleImagePick = (data: ImagePickerResponse) => {
    if (data && data.assets?.length) {
      setImage(data.assets[0]);
      setVisible(false);
    }
  };

  return (
    <Modal
      style={styles.modal}
      visible={visible}
      onBackdropPress={() => setVisible(false)}>
      <Card disabled>
        <Button
          style={styles.modalButtonItem}
          onPress={() => launchCamera({mediaType: 'photo'}, handleImagePick)}>
          Use your camera
        </Button>
        <Button
          style={styles.modalButtonItem}
          onPress={() =>
            launchImageLibrary({mediaType: 'photo'}, handleImagePick)
          }>
          Use your Gallery
        </Button>
        <Button
          style={styles.modalButtonItem}
          onPress={() => setVisible(false)}>
          Cancel
        </Button>
      </Card>
    </Modal>
  );
};

export default ImagePickerModal;

const styles = StyleService.create({
  modal: {
    width: '90%',
  },
  modalButtonItem: {
    marginBottom: 10,
    width: '100%',
    maxWidth: 500,
  },
  buttonDescription: {},
  buttonTitle: {
    fontWeight: 'bold',
  },
  buttonStyle: {
    borderWidth: 2,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#06514a',
    // $color-primary-500
    paddingTop: 150,
  },
  containerInner: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
  },
  form: {flex: 1, justifyContent: 'space-between'},
  title: {
    color: '#06514a',
    textAlign: 'center',
    marginTop: 10,
  },
  hi: {
    color: '#06514a',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 32,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#06514a',
    textAlign: 'center',
    marginTop: 10,
  },
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  input: {
    marginVertical: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
