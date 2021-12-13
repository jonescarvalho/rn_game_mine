/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
//import type {Node} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';

import params from './src/params';
import Field from './components/Field';
import Mine from './components/Mine';
import MineField from './components/MineField';
import LevelSelection from './src/screens/LevelSelection';
import Header from './components/Header';
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from './src/functions';

const App = () => {
  const minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();

    return createMinedBoard(rows, cols, minesAmount());
  };

  const [board, setBoard] = useState(createState());
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [showLevelSelection, setShowLevelSelection] = useState(false);

  const onOpenField = (row, column) => {
    const boardClone = cloneBoard(board);
    openField(boardClone, row, column);
    setBoard(boardClone);
    const lostClone = hadExplosion(boardClone);
    const wonClone = wonGame(boardClone);

    if (lostClone) {
      Alert.alert('Perdeu!', 'Que pena, você perdeu!', [
        {text: 'Reiniciar', onPress: () => setBoard(createState())},
      ]);
    }

    if (wonClone) {
      Alert.alert('Parabéns!', 'Você venceu!', [
        {text: 'Reiniciar', onPress: () => setBoard(createState())},
      ]);
    }

    //showMines(boardClone);
    //console.log(boardClone)
    setWon(wonClone);
    setLost(lostClone);
  };

  const onSelectField = (row, column) => {
    const boardClone = cloneBoard(board);
    invertFlag(boardClone, row, column);
    const wonClone = wonGame(boardClone);
    setWon(wonClone);
    setBoard(boardClone);
    if (wonClone) {
      Alert.alert('Parabéns!', 'Você venceu!', [
        {text: 'Reiniciar', onPress: () => setBoard(createState())},
      ]);
    }
  };

  const onLevelSelected = level => {
    params.difficultLevel = level;
    setShowLevelSelection(false);
    setBoard(createState());
  };

  return (
    <View style={styles.container}>
      <LevelSelection
        isVisible={showLevelSelection}
        onLevelSelected={onLevelSelected}
        onCancel={() => setShowLevelSelection(false)}
      />
      <Header
        flagsLeft={minesAmount() - flagsUsed(board)}
        onNewGame={() => setBoard(createState())}
        onFlagPress={() => setShowLevelSelection(true)}
      />

      <View style={styles.board}>
        <MineField
          board={board}
          onOpenField={onOpenField}
          onSelectField={onSelectField}
        />
      </View>

      {/* <Field />
      <Field opened />
      <Field opened nearMines={1} />
      <Field opened nearMines={2} />
      <Field opened nearMines={3} />
      <Field opened nearMines={6} />
      <Field mined />
      <Field mined opened />
      <Field mined opened exploded />
      <Field flagged />
      <Field flagged opened /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});

export default App;
