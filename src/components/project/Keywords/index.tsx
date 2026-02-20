import React, { useState } from 'react';

export default function Keywords() {
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (e) => {
    console.log();
  };

  return (
    <div>
      {/* 検索 input 欄 */}
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </div>
      {/* 検索 結果 欄 */}
      <div className="min-h-10 px-[5%] py-3"></div>
    </div>
  );
}
