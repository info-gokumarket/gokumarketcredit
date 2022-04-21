/*
 * Strategy Name: Anti Whale
 * Stategy documentation url: https://snapshot.org/#/strategy/anti-whale
 * Following is the calculation example for the strategy
 */

// defaults taken by Gokumarket DEX
const antiWhale = {
    exponent: 0.5,
    inflectionPoint: 5,
    threshold: 5
};

function getVotingPower(gmcBalance) {
    // erc20-balance-of strategy will give same voting power as the balance of the user
    // Read more about erc20-balance-of strategy from here: https://snapshot.org/#/strategy/erc20-balance-of
    let votingPower = gmcBalance;

    if (votingPower > antiWhale.threshold) {
        const factor = votingPower / antiWhale.inflectionPoint;

        votingPower = antiWhale.inflectionPoint * Math.pow(factor, antiWhale.exponent);
    }
    else if (votingPower <= antiWhale.threshold) {
        const factor = antiWhale.threshold / antiWhale.inflectionPoint;
        const thresholdMultiplier = antiWhale.inflectionPoint * Math.pow(factor, antiWhale.exponent) / antiWhale.threshold;

        votingPower = votingPower * thresholdMultiplier;
    }

    return votingPower;
}

console.log(getVotingPower(1000));
// prints: 70.71067811865476
