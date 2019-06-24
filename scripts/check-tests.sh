#!/bin/bash

TESTS=`find ${@:-src} -type f -name '*.js' | grep '/__tests__/' | sort`

RET=0
T_RET=0

RED="\033[1;31m"
GREEN="\033[1;32m"
CYAN="\033[1;36m"
CLEAR="\033[0m"

ERASE_LINE="\033[2K\r"

HIGHLIGHT="\033[1;4;35m"

RUNNING_STR="${CYAN}running...${CLEAR}"
FAILED_STR="${RED}✗${CLEAR}"
PASSED_STR="${GREEN}✔${CLEAR}"

JEST_CMD="`yarn bin`/jest --color --runTestsByPath"
BATCH_RUN_MODE="batch"
INDIVIDUAL_RUN_MODE="individual"
NONE_RUN_MODE="none"

function failed() {
  echo -e "${ERASE_LINE}$1 ${FAILED_STR} $2${CLEAR}"
  RET=1
  T_RET=1
}

function passed() {
  echo -e "${ERASE_LINE}$1 ${PASSED_STR}"
}

function runTests() {
  T_PRE_TEST_RET=$T_RET
  T_RET=0
  DID_OUTPUT=0
  FAILED_PREFIX=${1:-"some tests"}
  PASSED_PREFIX=${1:-"all tests passed"}
  T_OUT=`${JEST_CMD} $1 2>&1`
  if [ $? -ne 0 ]; then
    failed "$FAILED_PREFIX" "failed"
    if [ ${NO_TEST_OUTPUT:-0} -ne 1 ]; then
      echo -e "$T_OUT" | sed 's/\(^.*$\)/|  \1/g'
      DID_OUTPUT=1
    fi
  fi

  if echo "$T_OUT" | grep 'console[.]' >/dev/null 2>/dev/null; then
    if [ ${NO_TEST_OUTPUT:-0} -ne 1 -a $DID_OUTPUT -eq 0 ]; then
      echo -e "$T_OUT" | sed 's/\(^.*$\)/|  \1/g'
    fi
  fi

  if echo "$T_OUT" | grep 'test did not stub' >/dev/null 2>/dev/null; then
    failed "$FAILED_PREFIX" "missing ${HIGHLIGHT}stub "
  fi

  if [ $T_RET -eq 0 -a $T_PRE_TEST_RET -eq 0 ]; then
    passed "$PASSED_PREFIX"
  else
    echo -e "${ERASE_LINE}"
  fi
}

for T in $TESTS; do
  if [ ! -f $T ]; then
    failed "$T" "is not a file"
  fi
done
if [ $RET -ne 0 ]; then
  exit $RET
fi

for T in $TESTS; do
  T=`echo $T | sed 's:/\{2,\}:/:g'`
  echo -e "pre-check on $T ${RUNNING_STR}"
  if grep '^ *testSaga[(]' $T >/dev/null 2>/dev/null; then
    failed "$T" "missing ${HIGHLIGHT}await${CLEAR} testSaga(...)"
  fi

  if grep ' useFakeTimers[(]' $T >/dev/null 2>/dev/null &&
     grep ' testSaga[(]' $T >/dev/null 2>/dev/null; then
    failed "$T" "${HIGHLIGHT}useFakeTimers(...)${CLEAR} breaks testSaga(...)! Stub ${HIGHLIGHT}Date.now"
  fi

  if grep '^const \+normalizedResult *[^:]' $T >/dev/null 2>/dev/null; then
    failed "$T" "missing normalizedResult ${HIGHLIGHT}: FlowType${CLEAR} = {...}"
  fi

  if [ "${RUN_MODE:-$BATCH_RUN_MODE}" == "$INDIVIDUAL_RUN_MODE" ]; then
    echo -e "$T ${RUNNING_STR}"
    runTests "$T"
  fi
done

if [ "${RUN_MODE:-$BATCH_RUN_MODE}" == "$BATCH_RUN_MODE" ]; then
  echo -e "Running all tests, please wait..."
  runTests
fi

exit $RET
