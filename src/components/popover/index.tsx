import React, {FC, Dispatch, SetStateAction} from 'react';
import {Layout, MenuItem, OverflowMenu} from '@ui-kitten/components';
import {RenderFCProp} from '@ui-kitten/components/devsupport';

interface PopOverProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onUpgrade: () => void;
  onRemove: () => void;
  renderToggleButton: RenderFCProp<{}>;
}

export const PopOver: FC<PopOverProps> = ({
  visible,
  setVisible,
  renderToggleButton,
  onUpgrade = () => {},
  onRemove = () => {},
}) => {
  return (
    <Layout level="1">
      <OverflowMenu
        visible={visible}
        anchor={renderToggleButton}
        onBackdropPress={() => setVisible(false)}>
        <MenuItem title="Upgrade" onPress={onUpgrade} />
        <MenuItem title="Remove" onPress={onRemove} />
      </OverflowMenu>
    </Layout>
  );
};

export default PopOver;
