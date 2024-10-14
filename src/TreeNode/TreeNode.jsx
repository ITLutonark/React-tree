import React, { useState } from 'react';
import styles from "./TreeNode.module.css"

// Компонент для отображения узла дерева
const TreeNode = ({ node, onAdd, onDelete }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [newChildTitle, setNewChildTitle] = useState('');
    const [isShown, setIsShown] = useState(false);

  //Раскрыть-скрыть список
    const toggleOpen = () => setIsOpen(!isOpen);
  //Раскрыть-скрыть добавление child
    const toggleShown = () => {
      setIsShown(!isShown)
      setIsOpen(true)
    };

    const handleAddChild = () => {
      if (newChildTitle) {
        onAdd(node.title, newChildTitle);
        setNewChildTitle('');
        setIsShown(false)
      }
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.treeItem}>
          <span className={styles.title} onClick={toggleOpen}>
             {isOpen ? '-' : '+'} {node.title}
          </span>
          <button onClick={() => onDelete(node.title)}>X</button>
          <button onClick={() => {
            toggleShown()
            }}>Добавить подкаталог</button>
        </div>
        {isOpen &&  (
          <div>
            {isShown && (
            <div className={styles.inputAdd}>
            <input 
              type="text"
              value={newChildTitle}
              onChange={(e) => setNewChildTitle(e.target.value)}
              placeholder="Добавить дочерний элемент"
            />
            <button onClick={handleAddChild}>Добавить</button>
            </div>
            )}
            {node.children && node.children.map((child, index) => (
              <TreeNode
                key={index}
                node={child}
                onAdd={onAdd}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  export default TreeNode