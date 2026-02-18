import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TreeNode } from '../types';

interface TreeViewProps {
  nodes: TreeNode[];
  level?: number;
}

export const TreeView: React.FC<TreeViewProps> = ({ nodes, level = 0 }) => {
  return (
    <View style={styles.container}>
      {nodes.map((node, index) => (
        <View key={`${level}-${index}`} style={[styles.nodeContainer, { marginLeft: level * 16 }]}>
          <Text style={styles.nodeText}>{node.text}</Text>
          {node.children && node.children.length > 0 && (
            <TreeView nodes={node.children} level={level + 1} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  nodeContainer: {
    marginVertical: 2,
  },
  nodeText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
});
