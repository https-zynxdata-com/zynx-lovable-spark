                    {[
                      { problem: 'Icon not showing', solution: 'Check Lucide React icon name spelling' },
                      { problem: 'Image loading slow', solution: 'Add lazy loading + WebP format' },
                      { problem: 'Mobile icon too small', solution: 'Add responsive icon size={24}' }
                    ].map(fix => (
                      <div key={fix.problem} className="border border-gray-100 rounded-lg p-4">
                        <h4 className="font-medium text-red-600 mb-2">❌ {fix.problem}</h4>
                        <p className="text-sm text-green-600">✅ {fix.solution}</p>
                        <button
                          onClick={() => copyToClipboard(fix.solution)}
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1 mt-2"
                        >
                          <Copy size={12} />
                          Copy Solution
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LovablePromptsGenerator;