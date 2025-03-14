@app.route('/withdraw', methods=['POST'])
def withdraw():
    data = request.json
    wallet_address = data.get("wallet")
    amount = data.get("amount")

    if wallet_address not in fake_balances:
        return jsonify({"error": "Wallet not found"}), 400

    # Wallet balance ko update karo (sirf Fake RPC ke andar)
    fake_balances[wallet_address] += amount

    return jsonify({"message": "Withdraw successful", "new_balance": fake_balances[wallet_address]})
