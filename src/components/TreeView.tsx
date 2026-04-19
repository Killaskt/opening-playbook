import type { CSSProperties } from 'react';
import type { TreeNode } from '../types';
import { useTheme } from '../theme/ThemeContext';

interface TreeViewProps {
  nodes: TreeNode[];
  level?: number;
}

export function TreeView({ nodes, level = 0 }: TreeViewProps) {
  const { colors, spacing, typography } = useTheme();

  const containerStyle: CSSProperties = { width: '100%' };

  return (
    <div style={containerStyle}>
      {nodes.map((node, index) => (
        <div
          key={`${level}-${index}`}
          style={{ marginLeft: level * 16, marginTop: spacing.xxs, marginBottom: spacing.xxs }}
        >
          <span
            style={{
              fontSize: typography.bodySM.fontSize,
              lineHeight: `${typography.bodySM.lineHeight}px`,
              color: colors.text,
              fontFamily: 'monospace',
            }}
          >
            {node.text}
          </span>
          {node.children && node.children.length > 0 && (
            <TreeView nodes={node.children} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
}
