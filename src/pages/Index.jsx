import React, { useEffect, useState } from "react";
import { Container, Text, VStack, Spinner, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import axios from "axios";
import { SMA } from "technicalindicators";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [filteredPairs, setFilteredPairs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取所有永续合约交易对
        const response = await axios.get("https://www.okex.com/api/v5/public/instruments?instType=SWAP");
        const pairs = response.data.data;

        const filteredPairs = [];

        for (const pair of pairs) {
          const { instId } = pair;

          // 获取4小时图的K线数据
          const klineResponse = await axios.get(`https://www.okex.com/api/v5/market/candles?instId=${instId}&bar=4H`);
          const klineData = klineResponse.data.data;

          const closePrices = klineData.map((k) => parseFloat(k[4])).reverse();

          // 计算MA3和MA55
          const ma3 = SMA.calculate({ period: 3, values: closePrices });
          const ma55 = SMA.calculate({ period: 55, values: closePrices });

          // 检查MA3是否向上穿过MA55
          if (ma3.length >= 2 && ma55.length >= 2 && ma3[ma3.length - 2] <= ma55[ma55.length - 2] && ma3[ma3.length - 1] > ma55[ma55.length - 1]) {
            // 计算每次交易的振幅
            const amplitudes = klineData.map((k) => ((parseFloat(k[2]) - parseFloat(k[3])) / parseFloat(k[1])) * 100);

            // 筛选出振幅在3%-5%之间的交易对
            const validAmplitudes = amplitudes.filter((amp) => amp >= 3 && amp <= 5);

            if (validAmplitudes.length > 0) {
              // 检查是否属于横盘状态
              const isSideways = closePrices.every((price) => Math.abs(price - closePrices[0]) / closePrices[0] < 0.01);

              if (!isSideways) {
                filteredPairs.push(instId);
              }
            }
          }
        }

        setFilteredPairs(filteredPairs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Filtered Trading Pairs</Text>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Trading Pair</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredPairs.map((pair) => (
                <Tr key={pair}>
                  <Td>{pair}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
